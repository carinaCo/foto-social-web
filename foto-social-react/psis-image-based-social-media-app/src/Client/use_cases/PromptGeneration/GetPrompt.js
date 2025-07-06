//TODO: Selects a prompt and returns it -->
//checks if collection prompts exists for this group, if not --> create prompts collection
//check if prompts collection of this group has a prompt that was created after 12pm German Time
//If not, go to general random prompts collection and retrieve a random one
//if it does exist, return that prompt

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GetPrompt {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ groupId }) {
    if (!groupId) {
      throw new Error('Missing required parameter: groupId');
    }

    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);
    const runQueryUrl = firestoreHelper.getRunQueryUrl();

    const now = new Date();
    const germanyNoon = new Date(now);
    germanyNoon.setUTCHours(10, 0, 0, 0); 

    const recentPromptQuery = {
      structuredQuery: {
        from: [{ collectionId: 'Prompts' }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'createdAt' },
            op: 'GREATER_THAN_OR_EQUAL',
            value: { timestampValue: germanyNoon.toISOString() },
          },
        },
        orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }],
        limit: 1,
      },
      parent: `projects/${this.projectId}/databases/(default)/documents/Groups/${groupId}`,
    };

    let recentPromptResult = [];
    try {
      recentPromptResult = await httpClient.post(runQueryUrl, recentPromptQuery);
    } catch (err) {
      console.warn('Recent prompt query failed:', err.message);
    }

    const recentDoc = recentPromptResult.find(res => res.document);
    if (recentDoc) {
      return {
        success: true,
        source: 'group (recent)',
        prompt: recentDoc.document.fields.promptText.stringValue,
      };
    }

    const fallbackQuery = {
      structuredQuery: {
        from: [{
          collectionId: 'Prompts',
          allDescendants: false
        }]
      },
      parent: `projects/${this.projectId}/databases/(default)/documents/Groups/${groupId}`
    };
    

    let fallbackResult = [];
    try {
      fallbackResult = await httpClient.post(runQueryUrl, fallbackQuery);
    } catch (err) {
      console.error('Fallback prompt query failed:', err.message);
      throw new Error('Unable to fetch prompts for this group');
    }

    console.log('Raw fallback response:', JSON.stringify(fallbackResult, null, 2));


    const allPrompts = fallbackResult.filter(res => res.document);
    if (!allPrompts.length) {
      throw new Error('No prompts exist in this group');
    }

    const randomDoc = allPrompts[Math.floor(Math.random() * allPrompts.length)];
    return {
      success: true,
      source: 'group (random)',
      prompt: randomDoc.document.fields.promptText.stringValue,
    };
  }
}




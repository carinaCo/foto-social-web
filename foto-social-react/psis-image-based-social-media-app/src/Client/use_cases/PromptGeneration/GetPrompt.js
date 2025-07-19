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

  /*async execute({ groupId }) {
    if (!groupId) {
      throw new Error('Missing required parameter: groupId');
    }
  
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);
    const runQueryUrl = firestoreHelper.getRunQueryUrl();
  
    const now = new Date();

    const germanyTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
    germanyTime.setHours(0, 0, 0, 0);
    germanyTime.setDate(germanyTime.getDate() - 2);

    const germanyMidnightUTC = new Date(germanyTime.getTime() - germanyTime.getTimezoneOffset() * 60000).toISOString();

    const recentPromptQuery = {
      structuredQuery: {
        from: [{ collectionId: 'Prompts' }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'createdAt' },
            op: 'GREATER_THAN_OR_EQUAL',
            value: { timestampValue: germanyMidnightUTC },
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
  
    // --- Step 2: Fallback - get any prompt in group
    const fallbackQuery = {
      structuredQuery: {
        from: [{ collectionId: 'Prompts' }],
        limit: 10
      },
      parent: `projects/${this.projectId}/databases/(default)/documents/Groups/${groupId}`,
    };
  
    let fallbackResult = [];
    try {
      fallbackResult = await httpClient.post(runQueryUrl, fallbackQuery);

    } catch (err) {
      console.error('Fallback prompt query failed:', err.message);
      throw new Error('Unable to fetch prompts for this group');
    }

    console.log('fallbackResult FULL:', JSON.stringify(fallbackResult, null, 2));

  
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
  */
  async execute({ groupId }) {
    if (!groupId) {
      throw new Error('Missing required parameter: groupId');
    }
  
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);
    const runQueryUrl = firestoreHelper.getRunQueryUrl();
  
    // Step 1: Get most recent prompt via collection group query
    const recentPromptQuery = {
      structuredQuery: {
        from: [{ collectionId: 'Prompts', allDescendants: true }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'groupId' },
            op: 'EQUAL',
            value: { stringValue: groupId }
          }
        },
        orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }],
        limit: 1
      },
      parent: `projects/${this.projectId}/databases/(default)/documents`
    };
  
    console.log('➡️ Querying most recent prompt...');
    console.log('Recent prompt query:', JSON.stringify(recentPromptQuery, null, 2));
    console.log('RunQuery URL:', runQueryUrl);
  
    let recentPromptResult = [];
    try {
      recentPromptResult = await httpClient.post(runQueryUrl, recentPromptQuery);
      console.log('Recent prompt raw result:', JSON.stringify(recentPromptResult, null, 2));
    } catch (err) {
      console.warn('Recent prompt query failed:', err.message);
    }
  
    const recentDoc = recentPromptResult.find(res => res.document);
    if (recentDoc) {
      console.log('Found recent prompt document:', JSON.stringify(recentDoc.document, null, 2));
      return {
        success: true,
        source: 'group (recent)',
        prompt: recentDoc.document.fields.promptText?.stringValue ?? '[missing promptText]',
      };
    }
  
    console.log('⚠️ No recent prompt found, falling back to group query...');
  
    // Step 2: Fallback — get up to 10 prompts for this groupId
    const fallbackQuery = {
      structuredQuery: {
        from: [{ collectionId: 'Prompts', allDescendants: true }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'groupId' },
            op: 'EQUAL',
            value: { stringValue: groupId }
          }
        },
        limit: 10
      },
      parent: `projects/${this.projectId}/databases/(default)/documents`
    };
  
    console.log('➡️ Sending fallback prompt query...');
    console.log('Fallback prompt query:', JSON.stringify(fallbackQuery, null, 2));
  
    let fallbackResult = [];
    try {
      fallbackResult = await httpClient.post(runQueryUrl, fallbackQuery);
      console.log('Fallback raw result:', JSON.stringify(fallbackResult, null, 2));
    } catch (err) {
      console.error('Fallback prompt query failed:', err.message);
      throw new Error('Unable to fetch prompts for this group');
    }
  
    console.log('🔍 Filtering fallback result for valid documents...');
    const allPrompts = fallbackResult.filter(res => res.document);
    console.log(`📄 Found ${allPrompts.length} prompt documents`);
    allPrompts.forEach((res, index) => {
      const docName = res.document.name;
      const promptText = res.document.fields?.promptText?.stringValue ?? '[missing promptText]';
      const createdAt = res.document.fields?.createdAt?.timestampValue ?? '[missing createdAt]';
      console.log(`   - Prompt ${index + 1}: ${docName} → promptText: "${promptText}" → createdAt: "${createdAt}"`);
    });
  
    if (!allPrompts.length) {
      console.error('No prompts exist in this group — check collection or fields.');
      throw new Error('No prompts exist in this group');
    }
  
    const randomDoc = allPrompts[Math.floor(Math.random() * allPrompts.length)];
    return {
      success: true,
      source: 'group (random)',
      prompt: randomDoc.document.fields.promptText?.stringValue ?? '[missing promptText]',
    };
  }  
  
  
  
}




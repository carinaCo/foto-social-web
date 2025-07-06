//Expects either the group-ID or also a date
//Retrieves all messages-IDs, that have been generall or starting with a certain date created in the group

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GetGroupMessages {
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
  
    const query = {
      structuredQuery: {
        from: [{
          collectionId: 'Messages',
          allDescendants: true
        }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'groupId' },
            op: 'EQUAL',
            value: { stringValue: groupId }
          }
        },
        orderBy: [{
          field: { fieldPath: 'createdAt' },
          direction: 'ASCENDING'
        }]
      }
    };
    
  
    let messagesResponse = [];
    try {
      messagesResponse = await httpClient.post(runQueryUrl, query);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
      throw err;
    }
  
    const messageIds = messagesResponse
      .filter(res => res.document)
      .map(res => res.document.name.split('/').pop());
  
    return {
      groupId,
      messages: messageIds
    };
  }
  
}


//Expects a group-ID and a date
//Retrieves all post- and message-IDs that have been posted in the group on a day

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

//TODO: Repurpose to Global Feed
//TODO: look at error?!

export class GetGroupFeed {
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

    const buildQuery = (collectionId) => ({
      structuredQuery: {
        from: [{ collectionId, allDescendants: true }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'groupId' },
            op: 'EQUAL',
            value: { stringValue: groupId }
          }
        },
        orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'ASCENDING' }]
      }
    });
    
    let postsResponse = [];
    try {
      postsResponse = await httpClient.post(runQueryUrl, buildQuery('Posts'));
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }

    const postIds = postsResponse
      .filter(res => res.document)
      .map(res => res.document.name.split('/').pop());

    let messagesResponse = [];
    try {
      messagesResponse = await httpClient.post(runQueryUrl, buildQuery('Messages'));
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }

    const messageIds = messagesResponse
      .filter(res => res.document)
      .map(res => res.document.name.split('/').pop());

    const today = new Date();

    const germanToday = new Date(today.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
    
    return {
      groupId,
      date: germanToday,
      posts: postIds,
      messages: messageIds
    };
  }
}
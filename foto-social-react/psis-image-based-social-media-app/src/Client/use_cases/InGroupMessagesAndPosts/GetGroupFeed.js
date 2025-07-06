//Expects a group-ID and a date
//Retrieves all post- and message-IDs that have been posted in the group on a day

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

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

    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;

    const startOfDay = new Date(`${today}T00:00:00.000Z`).toISOString();
    const endOfDay = new Date(`${today}T23:59:59.999Z`).toISOString();

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

    return {
      groupId,
      date: today,
      posts: postIds,
      messages: messageIds
    };
  }
}

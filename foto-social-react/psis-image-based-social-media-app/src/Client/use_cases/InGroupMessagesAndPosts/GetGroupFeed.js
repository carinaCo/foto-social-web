//TODO: Expects a group-ID and a date
//Retrieves all post- and message-IDs that have been posted in the group on a day

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GetGroupFeed {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  //TODO: change w data from DB!
  async execute({ groupId, date }) {
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const startOfDay = new Date(date + 'T00:00:00.000Z').toISOString();
    const endOfDay = new Date(date + 'T23:59:59.999Z').toISOString();

    const postsUrl = firestoreHelper.getGroupPostsUrl(groupId) + `:runQuery`;
    const postsQuery = {
      structuredQuery: {
        where: {
          fieldFilter: {
            field: { fieldPath: 'createdAt' },
            op: 'GREATER_THAN_OR_EQUAL',
            value: { timestampValue: startOfDay }
          }
        },
        from: [{ collectionId: 'posts' }]
      }
    };

    const postsResponse = await httpClient.post(postsUrl, postsQuery);
    const postIds = postsResponse
      .filter(res => res.document)
      .filter(res => {
        const ts = res.document.fields.createdAt.timestampValue;
        return ts <= endOfDay;
      })
      .map(res => res.document.name.split('/').pop());

    const messagesUrl = firestoreHelper.getGroupMessagesUrl(groupId) + `:runQuery`;
    const messagesQuery = {
      structuredQuery: {
        where: {
          fieldFilter: {
            field: { fieldPath: 'createdAt' },
            op: 'GREATER_THAN_OR_EQUAL',
            value: { timestampValue: startOfDay }
          }
        },
        from: [{ collectionId: 'messages' }]
      }
    };

    const messagesResponse = await httpClient.post(messagesUrl, messagesQuery);
    const messageIds = messagesResponse
      .filter(res => res.document)
      .filter(res => {
        const ts = res.document.fields.createdAt.timestampValue;
        return ts <= endOfDay;
      })
      .map(res => res.document.name.split('/').pop());

    return {
      groupId,
      date,
      posts: postIds,
      messages: messageIds
    };
  }
}

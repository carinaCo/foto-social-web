//Expects the user-ID of the person who posted and the group ID, 
//Returns false if the user hasn't posted in the group on given day, true otherwise

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class HasUserPostedInGroupToday {
  constructor({ projectId, databaseId = '(default)', storageBucket = "foto-social-web.firebasestorage.app" }) {
    this.projectId = projectId;
    this.databaseId = databaseId;
    this.storageBucket = storageBucket;
  }

  async execute({ userId, groupId }) {
    if (!userId || !groupId) {
      throw new Error('Missing required parameter(s)');
    }

    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({
      projectId: this.projectId,
      databaseId: this.databaseId
    });

    const httpClient = new HttpClient(accessToken);

    const today = new Date().toISOString().split('T')[0];

    const queryUrl = firestoreHelper.getRunQueryUrl();

    const queryBody = {
      structuredQuery: {
        from: [{ collectionId: 'Posts', allDescendants: true }],
        where: {
          compositeFilter: {
            op: 'AND',
            filters: [
              {
                fieldFilter: {
                  field: { fieldPath: 'userId' },
                  op: 'EQUAL',
                  value: { stringValue: userId }
                }
              },
              {
                fieldFilter: {
                  field: { fieldPath: 'groupId' },
                  op: 'EQUAL',
                  value: { stringValue: groupId }
                }
              },
              {
                fieldFilter: {
                  field: { fieldPath: 'createdAt' },
                  op: 'GREATER_THAN_OR_EQUAL',
                  value: { timestampValue: `${today}T00:00:00Z` }
                }
              },
              {
                fieldFilter: {
                  field: { fieldPath: 'createdAt' },
                  op: 'LESS_THAN',
                  value: { timestampValue: `${today}T23:59:59Z` }
                }
              }
            ]
          }
        },
        limit: 1
      }
    };

    const response = await httpClient.post(queryUrl, queryBody);

    const hasPosted = Array.isArray(response) && response.some(doc => doc.document);

    return hasPosted;
  }
}

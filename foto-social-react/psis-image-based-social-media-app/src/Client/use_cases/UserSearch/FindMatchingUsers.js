//Awaits a search string (part of a username)
//and retrieves a list of user IDs, where the usernames contain this string 
//Supports the User- and Friend search 

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

function getNextUnicodeChar(str) {
  const lastChar = str[str.length - 1];
  const nextChar = String.fromCharCode(lastChar.charCodeAt(0) + 1);
  return str.slice(0, -1) + nextChar;
}

export class FindMatchingUsers {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ searchString }) {
    if (!searchString) {
      throw new Error('Missing required parameter: searchString');
    }

    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const queryUrl = firestoreHelper.getRunQueryUrl();

    const startAt = searchString.toLowerCase();
    const endBefore = getNextUnicodeChar(startAt);

    const requestBody = {
      structuredQuery: {
        from: [{ collectionId: 'Users' }],
        where: {
          compositeFilter: {
            op: 'AND',
            filters: [
              {
                fieldFilter: {
                  field: { fieldPath: 'username' },
                  op: 'GREATER_THAN_OR_EQUAL',
                  value: { stringValue: startAt }
                }
              },
              {
                fieldFilter: {
                  field: { fieldPath: 'username' },
                  op: 'LESS_THAN',
                  value: { stringValue: endBefore }
                }
              }
            ]
          }
        }
      }
    };

    const response = await httpClient.post(queryUrl, requestBody);

    const users = response
      .filter(item => item.document)
      .map(item => {
        const doc = item.document;
        return {
          userId: doc.name.split('/').pop(),
          username: doc.fields.username?.stringValue || ''
        };
      });

    return {
      success: true,
      users
    };
  }
}


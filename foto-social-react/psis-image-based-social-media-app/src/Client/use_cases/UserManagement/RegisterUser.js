//Expects register data. Creates the user structure expected in Firestore

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';
import { randomUUID } from 'crypto';

export class RegisterUser {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ email, username, encryptedPassword }) {
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const userId = randomUUID();
    const queryUrl = firestoreHelper.getRunQueryUrl();

    const queryBody = {
      structuredQuery: {
        from: [{ collectionId: 'Users' }],
        where: {
          compositeFilter: {
            op: 'OR',
            filters: [
              {
                fieldFilter: {
                  field: { fieldPath: 'email' },
                  op: 'EQUAL',
                  value: { stringValue: email }
                }
              },
              {
                fieldFilter: {
                  field: { fieldPath: 'username' },
                  op: 'EQUAL',
                  value: { stringValue: username }
                }
              }
            ]
          }
        },
        limit: 1
      }
    };

    const queryResults = await httpClient.post(queryUrl, queryBody);

    console.log('Firestore runQuery results:', JSON.stringify(queryResults, null, 2));

    const userExists = Array.isArray(queryResults) && queryResults.some(result => result.document);

    if (userExists) {
      return { success: false, message: 'Email or username already in use' };
    }

    const userDocBody = {
      fields: {
        userId: { stringValue: userId },
        email: { stringValue: email },
        username: { stringValue: username },
        encrPassword: { stringValue: encryptedPassword },
        createdAt: { timestampValue: new Date().toISOString() },
        isLoggedIn: { booleanValue: true }
      }
    };

    const usersCollectionUrl = firestoreHelper.registerUserUrl();
    await httpClient.post(`${usersCollectionUrl}?documentId=${userId}`, userDocBody);

    return { success: true, userId };
  }
}




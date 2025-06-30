//Expects register data and a User-ID. Creates the user structure expected in Firestore

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
    console.log('Generated userId:', userId);

    //TODO: fix indexing in Firestore for this to work!

    const queryUrl = firestoreHelper.getUsersQueryUrl();

    const queryBody = {
      structuredQuery: {
        from: [{ collectionId: 'users' }],
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

    if (queryResults && queryResults.length && queryResults[0].document) {
      return { success: false, message: 'Email or username already in use' };
    }

    const userDocUrl = firestoreHelper.getUserDoc(userId);
    const userDocBody = {
      fields: {
        email: { stringValue: email },
        userId: { stringValue: userId },
        username: { stringValue: username },
        encrPassword: { stringValue: encryptedPassword },
        createdAt: { timestampValue: new Date().toISOString() }
      }
    };

    try {
      await httpClient.get(userDocUrl);
      console.log('User already exists, skipping registration');
      return { success: false, message: 'User already exists' };
    } catch (err) {
      if (err.message.includes('404')) {
        const usersCollectionUrl = firestoreHelper.registerUserUrl();
        await httpClient.post(`${usersCollectionUrl}?documentId=${userId}`, userDocBody);
        return { success: true };
      } else {
        throw err;
      }
    }
  }
}



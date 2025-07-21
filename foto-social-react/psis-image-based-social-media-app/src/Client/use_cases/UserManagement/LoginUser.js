//Expects username and password of the user logging in  
//Sets a boolean flag to true, to prevent multiple logins with the same username
//preserves values of a user while logging in

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';
import { wrapField } from '../../../utils/firestoreHelper.js';

export class LoginUser {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ username, password }) {
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({
      projectId: this.projectId
    });
    const httpClient = new HttpClient(accessToken);

    const queryUrl = firestoreHelper.getRunQueryUrl();
    const structuredQuery = {
      structuredQuery: {
        from: [{ collectionId: 'Users' }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'username' },
            op: 'EQUAL',
            value: { stringValue: username.trim() }
          }
        },
        limit: 1
      }
    };

    const response = await httpClient.post(queryUrl, structuredQuery);

    const matchedDoc = response[0]?.document;

    if (!matchedDoc) {
      return { success: false, error: 'User not found' };
    }

    const existingFields = matchedDoc.fields;
    const userId = existingFields.userId?.stringValue;

    if (!userId) {
      return { success: false, error: 'User ID missing in Firestore document' };
    }

    const userDocUrl = firestoreHelper.getUserDoc(userId);


    if (existingFields.encrPassword?.stringValue !== password) {
      return { success: false, error: 'Invalid password' };
    }

    /*if (existingFields.isLoggedIn?.booleanValue) {
      return { success: false, error: 'User already logged in' };
    }

     */



    const patchFields = {
      createdAt: existingFields.createdAt || wrapField(new Date()),
      email: wrapField(existingFields.email?.stringValue ?? null),
      encrPassword: wrapField(existingFields.encrPassword?.stringValue ?? null),
      role: wrapField(existingFields.role?.stringValue ?? 'user'),
      username: wrapField(existingFields.username?.stringValue ?? null),
      userId: wrapField(existingFields.userId?.stringValue ?? null),
      isLoggedIn: wrapField(true)
    };

    const patchBody = { fields: patchFields };
    const updateMask = Object.keys(patchFields)
      .map(f => `updateMask.fieldPaths=${encodeURIComponent(f)}`)
      .join('&');
    const patchUrl = `${userDocUrl}?${updateMask}`;

    await httpClient.patch(patchUrl, patchBody);

    return { success: true, userId: existingFields.userId?.stringValue };
  }
}



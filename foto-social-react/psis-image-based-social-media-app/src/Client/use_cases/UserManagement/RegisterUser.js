//Expects register data and a User-ID. Creates the user structure expected in Firestore

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class RegisterUser {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ userId, email, username, encryptedPassword }) {
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const userDocUrl = firestoreHelper.getUserDoc(userId);
    const userDocBody = {
      fields: {
        email: { stringValue: email },
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



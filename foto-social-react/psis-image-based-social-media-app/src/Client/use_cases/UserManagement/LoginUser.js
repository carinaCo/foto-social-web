//Expects a User-ID of the user logging in  
//Sets a boolean flag to true, to prevent multiple logins with the same username

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class LoginUser {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ userId }) {
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({
      projectId: this.projectId
    });
    const httpClient = new HttpClient(accessToken);

    const userDocUrl = firestoreHelper.getUserDoc(userId);

    const patchBody = {
      fields: {
        isLoggedIn: { booleanValue: true }
      }
    };

    const updateMask = 'isLoggedIn';
    const patchUrl = `${userDocUrl}?updateMask.fieldPaths=${updateMask}`;

    await httpClient.patch(patchUrl, patchBody);

    return { success: true };
  }
}

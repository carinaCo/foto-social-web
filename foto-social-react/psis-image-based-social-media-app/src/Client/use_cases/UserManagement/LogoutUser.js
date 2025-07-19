//Sets login flag (boolean) back to false

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';
import { wrapField } from '../../../utils/firestoreHelper.js';

export class LogoutUser {
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
        isLoggedIn: wrapField(false)
      }
    };

    const updateMask = 'isLoggedIn';
    const patchUrl = `${userDocUrl}?updateMask.fieldPaths=${updateMask}`;

    await httpClient.patch(patchUrl, patchBody);

    try {
        await httpClient.patch(patchUrl, patchBody);
        return { success: true };
      } catch (err) {
        console.error('Failed to logout user:', err);
        return { success: false, message: err.message };
      }
  }
}
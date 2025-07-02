//TODO: 

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class AddFriend {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ userId }) {
    if (!userId) {
      throw new Error('Missing required parameter: userId');
    }

    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    
  }
}

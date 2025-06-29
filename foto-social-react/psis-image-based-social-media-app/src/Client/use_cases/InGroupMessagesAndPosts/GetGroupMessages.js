//TODO: Expects either the group-ID or also a date
//Retrieves all messages-IDs, that have been generall or starting with a certain date created in the group

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GetGroupMessages {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ groupId, date }) {
    const accessToken = await getFirestoreToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    
  }
}
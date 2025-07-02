//TODO: Adds a user to a group. Expects its user-ID as well as the group-ID

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class AddUserToGroup {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ userId, groupId }) {
    if (!userId) {
      throw new Error('Missing required parameter: userId');
    } else if(!groupId){
        throw new Error('Missing required parameter: groupId');
    }

    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    

    return {
        success: true,
        message: `User ${userId} has successfully been added to group ${groupId}`
      };

  }
}
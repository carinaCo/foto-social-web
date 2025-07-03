//Removes a user from a group. Expects its user-ID as well as the group-ID

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class RemoveUserFromGroup {
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

  const groupUsersBaseUrl = firestoreHelper.getGroupUsersUrl(groupId);
  const userDocUrl = `${groupUsersBaseUrl}/${userId}`;

  try {
    await httpClient.delete(userDocUrl);
  } catch (err) {
    console.error('Failed to remove user from group:', err);
    return {
      success: false,
      error: `Failed to remove user ${userId} from group ${groupId}`
    };
  }

  return {
    success: true,
    message: `User ${userId} has successfully been removed from group ${groupId}`
  };

  }
}
//Expects the group-ID and user-ID of a user
//and retrieves the permissions within the group (tells a normal user from admin apart)

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GetGroupUserRights {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ groupId, userId }) {
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const userDocUrl = firestoreHelper.getGroupMemberUrl(groupId, userId);

    try {
      const response = await httpClient.get(userDocUrl);
      const role = response.fields?.role?.stringValue || 'unknown';

      return {
        groupId,
        userId,
        role,
        isAdmin: role.toLowerCase() === 'admin'
      };
    } catch (error) {
      if (error.message?.includes('404')) {
        return {
          groupId,
          userId,
          role: null,
          isAdmin: false,
          error: 'User not found in group'
        };
      }

      throw error; 
    }
  }
}


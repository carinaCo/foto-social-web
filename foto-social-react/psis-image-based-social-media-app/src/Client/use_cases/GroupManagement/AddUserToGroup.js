//Adds a user to a group. Expects its user-ID as well as the group-ID

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

    const userDocUrl = firestoreHelper.getGroupUserDocUrl(groupId, userId);

    try {
        await httpClient.patch(userDocUrl, {
            fields: {
                joinedAt: { timestampValue: new Date().toISOString() }
            }
          }); 
      } catch (err) {
        console.error('Failed to add user to group:', err);
        return {
          success: false,
          error: 'Failed to add user to group. Please try again later.'
        };
      }     

    return {
        success: true,
        message: `User ${userId} has successfully been added to group ${groupId}`
      };

  }
}
// Adds a user to another user's friend list. Expects its user-ID as well as the userId tof the friend that adds

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class AddFriend {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ userId, toAddUserId }) {
    if (!userId) {
        throw new Error('Missing required parameter: userId');
    } else if (!toAddUserId){
        throw new Error('Missing required parameter: toAddUserId');
    }

    //TODO: see that 1 user can only be added once as friend

    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const friendsListUrl = firestoreHelper.getFriendsUrl(userId);
    console.log('The friend list of this user is:', friendsListUrl);

    const friendDocUrl = `${firestoreHelper.getFriendsUrl(userId)}/${toAddUserId}`;

    try {
        await httpClient.patch(friendDocUrl, {
            fields: {
              addedAt: { timestampValue: new Date().toISOString() }
            }
          }); 
      } catch (err) {
        console.error('Failed to add user:', err);
        return {
          success: false,
          error: 'Failed to add user. Please try again later.'
        };
      }     

    return {
        success: true,
        message: `User ${userId} has successfully added to friends list user ${toAddUserId}`
      };
    
  }
}

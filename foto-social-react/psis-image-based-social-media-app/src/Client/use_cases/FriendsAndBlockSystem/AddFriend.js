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
    } else if (!toAddUserId) {
      throw new Error('Missing required parameter: toAddUserId');
    }

    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const friendDocUrl = `${firestoreHelper.getFriendsUrl(userId)}/${toAddUserId}`;

    try {
      const existingFriend = await httpClient.get(friendDocUrl);
      if (existingFriend && existingFriend.fields) {
        return {
          success: false,
          message: `User ${toAddUserId} is already in ${userId}'s friend list.`
        };
      }
    } catch (err) {
      if (err.message && err.message.includes('404')) {
      } else {
        console.error('Unexpected error when checking existing friend:', err);
        return {
          success: false,
          error: 'Failed to verify existing friendship. Please try again later.'
        };
      }
    }
    
    try {
      await httpClient.patch(friendDocUrl, {
        fields: {
          addedAt: { timestampValue: new Date().toISOString() }
        }
      });

      return {
        success: true,
        message: `User ${userId} has successfully added user ${toAddUserId} as a friend.`
      };
    } catch (err) {
      console.error('Failed to add user:', err);
      return {
        success: false,
        error: 'Failed to add user. Please try again later.'
      };
    }
  }
}


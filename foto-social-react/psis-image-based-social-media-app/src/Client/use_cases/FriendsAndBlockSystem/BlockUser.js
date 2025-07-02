// Expects the user-ID of the blocking as well as of the to be blocked user
//Adds the blocked user to the blocked users list

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class BlockUser {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ blockingUserId, toBeBlockedUserId }) {
    if (!blockingUserId || !toBeBlockedUserId) {
      throw new Error('Missing required parameter: blockingUserId or toBeBlockedUserId');
    }

    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const blockedByUserList = firestoreHelper.getBlockedByUserListUrl(blockingUserId);
    console.log('The users blocked by this user are :', blockedByUserList);

    const blockDocUrl = firestoreHelper.blockUserUrl(blockingUserId, toBeBlockedUserId);

    try {
        await httpClient.patch(blockDocUrl, {
            fields: {
              blockedAt: { timestampValue: new Date().toISOString() }
            }
          }); 
      } catch (err) {
        console.error('Failed to block user:', err);
        return {
          success: false,
          error: 'Failed to block user. Please try again later.'
        };
      }     

    return {
        success: true,
        message: `User ${blockingUserId} has successfully blocked user ${toBeBlockedUserId}`
      };
  }
}
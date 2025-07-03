//Removes an existing friendship
//Expects the user_ID of the user, that ended the friendship, as well as the user-ID of the friend to be removed

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class RemoveFriend {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ userId, friendId }) {
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const userFriendDocUrl = firestoreHelper.removeFriendUrl(userId, friendId);

    const friendDocUrl = firestoreHelper.removeFriendUrl(friendId, userId);

    await httpClient.delete(userFriendDocUrl);
    await httpClient.delete(friendDocUrl);
    
    return {
      success: true,
      message: `Friendship between ${userId} and ${friendId} removed.`
    };
  }
}

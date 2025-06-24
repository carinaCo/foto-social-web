//TODO: Removes an existing friendship
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

    // 1. Build the URL to the friend document in user's collection
    const userFriendDocUrl = firestoreHelper.removeFriendUrl(userId, friendId);

    // 2. Optionally: Build reciprocal removal, if friendship is bidirectional
    const friendDocUrl = firestoreHelper.removeFriendUrl(friendId, userId);

    // 3. Delete both sides of the friendship
    await httpClient.delete(userFriendDocUrl);
    await httpClient.delete(friendDocUrl); // Optional based on your data model

    return {
      success: true,
      message: `Friendship between ${userId} and ${friendId} removed.`
    };
  }
}

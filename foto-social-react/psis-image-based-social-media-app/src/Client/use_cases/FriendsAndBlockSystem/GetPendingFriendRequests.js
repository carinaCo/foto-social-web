//Takes the user-ID of the logged in user and retrieves a list of user-IDs
// that have sent a friend request to this user, that has not yet been accepted yet

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GetPendingFriendRequests {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ userId }) {
    if (!userId) {
      throw new Error('Missing required parameter: userId');
    }

    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const friendRequestsCollectionUrl = firestoreHelper.getPendingFriendRequestsUrl(userId);
    console.log('Fetching pending friend requests from:', friendRequestsCollectionUrl);

    let friendsResponse;
    try {
      friendsResponse = await httpClient.listDocuments(friendRequestsCollectionUrl);
    } catch (error) {
      console.error('Failed to fetch pending friend requests:', error.message);
      throw error;
    }

    const documents = friendsResponse.documents || [];
    const friendIds = documents
      .map(doc => doc.fields?.friendId?.stringValue || null)
      .filter(Boolean);

    return {
      userId,
      pendingFriendRequests: friendIds
    };
  }
}

//Takes the user ID (GUID) of a user (eg. logged in user)
//retrieves a list of user IDs that the user is friends with

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GetFriends {
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

    const friendsCollectionUrl = firestoreHelper.getUserFriendsUrl(userId);

    let friendsResponse;
    try {
      friendsResponse = await httpClient.listDocuments(friendsCollectionUrl);
    } catch (err) {
      console.error('Failed to fetch friends:', err);
      return {
        success: false,
        error: 'Failed to retrieve friends list.'
      };
    }

    const friendIds = friendsResponse.documents.map(doc => {
      const pathParts = doc.name.split('/');
      return pathParts[pathParts.length - 1];
    });

    return {
      success: true,
      userId,
      friends: friendIds
    };
  }
}
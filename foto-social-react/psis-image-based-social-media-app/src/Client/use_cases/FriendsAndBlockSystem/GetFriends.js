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

    const documents = friendsResponse.documents || [];

    const friendIds = documents
  .map(doc => {
    const pathParts = doc.name.split('/');
    return pathParts[pathParts.length - 1];
  })
  .filter(id => id !== 'init');


    const friends = [];

    for (const friendId of friendIds) {
      try {
        const friendDocUrl = firestoreHelper.getUserDoc(friendId);
        const friendDoc = await httpClient.get(friendDocUrl);
        const username = friendDoc.fields?.username?.stringValue || 'Unknown';

        friends.push({
          userId: friendId,
          username
        });
      } catch (err) {
        console.warn(`Could not retrieve user data for friend ${friendId}:`, err.message);
        friends.push({
          userId: friendId,
          username: null
        });
      }
    }

    return {
      success: true,
      userId,
      friends: friendIds
    };
  }
}

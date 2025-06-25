//Takes the user ID (GUID) of a user (eg. logged in user)
//retrieves a list of user IDs that the user is friends with

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GetFriends {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  // Retrieves a list of user IDs that the user is friends with
  async execute({ userId }) {
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    // Retrieve the user's list of friends
    const friendsCollectionUrl = firestoreHelper.getUserFriendsUrl(userId); // Should point to /users/{userId}/friends
    const friendsResponse = await httpClient.listDocuments(friendsCollectionUrl); // Assuming listDocuments fetches all documents in the collection

    const friendIds = friendsResponse.documents.map(doc => {
      const fields = doc.fields;
      return fields.friendId.stringValue; // Assumes each friend document has a 'friendId' field
    });

    return {
      userId,
      friends: friendIds
    };
  }
}

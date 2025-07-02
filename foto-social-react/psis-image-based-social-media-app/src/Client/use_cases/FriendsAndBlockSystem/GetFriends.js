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
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const friendsCollectionUrl = firestoreHelper.getUserFriendsUrl(userId); 
    const friendsResponse = await httpClient.listDocuments(friendsCollectionUrl); 
    const friendIds = friendsResponse.documents.map(doc => {
      const fields = doc.fields;
      return fields.friendId.stringValue;
    });

    return {
      userId,
      friends: friendIds
    };
  }
}

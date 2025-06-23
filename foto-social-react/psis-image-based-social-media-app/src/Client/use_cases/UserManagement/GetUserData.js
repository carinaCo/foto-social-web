//Expects a User-ID and 
//retrieves public user data such as username, friend list and block list
//Used for checking if certain actions such as add friend or invite to group are possible

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GetUserData {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ userId }) {
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const userDocUrl = firestoreHelper.getUserDoc(userId);
    console.log("these are the userFields : " + userDocUrl);
    const userResponse = await httpClient.get(userDocUrl);
    const userFields = userResponse.fields;
    console.log("userResponse : " + userResponse);

    const username = userFields.username?.stringValue || null;

    const friendsUrl = firestoreHelper.getFriendsUrl(userId);
    const friendsResponse = await httpClient.listDocuments(friendsUrl);
    const friends = friendsResponse.documents.map(doc => {
      return doc.fields?.friendId?.stringValue;
    }).filter(Boolean);

    const blockedUrl = firestoreHelper.getBlockedByUserListUrl(userId);
    const blockedResponse = await httpClient.listDocuments(blockedUrl);
    const blockedUsers = blockedResponse.documents.map(doc => {
      return doc.fields?.blockedUserId?.stringValue;
    }).filter(Boolean);

    return {
      userId,
      username,
      friends,
      blockedUsers
    };
  }
}

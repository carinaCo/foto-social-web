//Expects a User-ID and 
//retrieves public user data such as username, friend list and block list
//Used for checking if certain actions such as add friend or invite to group are possible
//Also offers info as to what groups the user is in

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GetUserData {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  //TODO: see how to get user data when login performed

  async getUserGroups({ userId, firestoreHelper, httpClient }) {
    const groupsUrl = firestoreHelper.getGroupsUrl();
    const groupsResponse = await httpClient.listDocuments(groupsUrl);
  
    const groupIds = [];
  
    for (const groupDoc of groupsResponse.documents || []) {
      const groupId = groupDoc.name.split('/').pop();
      const groupUsersUrl = firestoreHelper.getGroupUsersUrl(groupId);
      const usersResponse = await httpClient.listDocuments(groupUsersUrl);
  
      const isMember = (usersResponse.documents || []).some(doc => {
        return doc.fields?.userId?.stringValue === userId;
      });
  
      if (isMember) {
        groupIds.push(groupId);
      }
    }
  
    return groupIds;
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
    const groupId = await this.getUserGroups({ userId, firestoreHelper, httpClient });

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
      blockedUsers,
      groupId
    };
  }
}

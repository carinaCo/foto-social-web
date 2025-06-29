//Expects a group-ID and 
//retrieves group details: name, creation date, member list and rights of the members

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GetGroup {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ groupId }) {
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const groupDocUrl = firestoreHelper.getGroupUrl(groupId);
    console.log("this is the groupDocurl : " + groupDocUrl);

    const groupResponse = await httpClient.get(groupDocUrl);
    const groupData = groupResponse.fields;
    console.log('groupResponse:', groupResponse);

    const usersUrl = firestoreHelper.getGroupUsersUrl(groupId);
    const usersResponse = await httpClient.listDocuments(usersUrl);
    console.log('usersResponse:', usersResponse);

    const users = usersResponse.documents.map(doc => {
      const fields = doc.fields || {};
      return {
        userId: fields.userId?.stringValue || null,
        role: fields.role?.stringValue || null
      };
    });    
    console.log('users:', users);

    return {
      name: groupData.name?.stringValue || null,
      createdAt: groupResponse.createTime,
      founderId: groupData.founderId?.stringValue || null,
      members: users
    };
  }
}
//Expects a group-ID and 
//retrieves group details: name, creation date, member list and rights of the members

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreToken.js';

export class GetGroup {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ groupId }) {
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    // 1. Retrieve group document
    const groupDocUrl = firestoreHelper.getGroupUrl(groupId);
    console.log("this is the groupDocurl : " + groupDocUrl);

    const groupResponse = await httpClient.get(groupDocUrl);
    const groupData = groupResponse.fields;
    console.log('groupResponse:', groupResponse);

    // 2. Retrieve group members
    const membersUrl = firestoreHelper.getGroupMembersUrl(groupId);
    const membersResponse = await httpClient.listDocuments(membersUrl);
    const members = membersResponse.documents.map(doc => {
      const fields = doc.fields;
      return {
        userId: fields.userId.stringValue,
        role: fields.role.stringValue
      };
    });

    return {
      name: groupData.name?.stringValue || null,
      createdAt: groupResponse.createTime,
      //founderId: groupData.founderId.stringValue,
      //members
    };
  }
}

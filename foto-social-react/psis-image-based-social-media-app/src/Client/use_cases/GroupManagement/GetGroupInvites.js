//Takes a group ID and 
//returns a list of users who were invited by the admin but have not yet accepted the invitation

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GetGroupInvites {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ groupId }) {
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const groupDocUrl = firestoreHelper.getGroupUrl(groupId);
    console.log("Group document URL: " + groupDocUrl);

    const groupResponse = await httpClient.get(groupDocUrl);
    const groupData = groupResponse.fields;
    console.log('Group response:', groupResponse);

    const membersUrl = firestoreHelper.getGroupMembersUrl(groupId);
    const membersResponse = await httpClient.listDocuments(membersUrl);

    const invitedUsers = membersResponse.documents
      .map(doc => {
        const fields = doc.fields;
        return {
          userId: fields.userId?.stringValue,
          role: fields.role?.stringValue,
          status: fields.status?.stringValue, 
          invitedBy: fields.invitedBy?.stringValue
        };
      })
      .filter(member =>
        member.role === 'member' &&
        member.status === 'invited' &&
        member.invitedBy === 'admin'
      )
      .map(member => member.userId);

    return {
      name: groupData.name?.stringValue || null,
      createdAt: groupResponse.createTime,
      userList: invitedUsers
    };
  }
}

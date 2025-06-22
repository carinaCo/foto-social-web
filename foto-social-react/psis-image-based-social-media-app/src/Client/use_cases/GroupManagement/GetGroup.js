//TODO: Expects a group-ID and 
//retrieves group details: name, creation date, member list and rights of the members

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper';
import { HttpClient } from '../../../utils/httpClient';
import { getFirestoreToken } from '../../../utils/getFirestoreToken';

export class GetGroup {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  //TODO: change w data from DB!
  async execute({ groupId }) {
    const accessToken = await getFirestoreToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    // 1. Retrieve group document
    const groupDocUrl = firestoreHelper.getGroupUrl(groupId);
    const groupResponse = await httpClient.get(groupDocUrl);
    const groupData = groupResponse.fields;

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
      name: groupData.name.stringValue,
      createdAt: groupData.createdAt.timestampValue,
      founderId: groupData.founderId.stringValue,
      members
    };
  }
}

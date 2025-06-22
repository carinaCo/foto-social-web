//TODO: Expects a user-ID of the creator of the group and a group-ID (GUID)
//Created the group data structure in Firestore and sets the creator as user and admin

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper';
import { HttpClient } from '../../../utils/httpClient';
import { getFirestoreToken } from '../../../utils/getFirestoreToken';

export class CreateGroup {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  //TODO: change w data from DB!
  async execute({ groupId, founderId, groupName }) {
    const accessToken = await getFirestoreToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const groupDocUrl = firestoreHelper.getGroupUrl(groupId);
    const groupDocBody = {
      fields: {
        name: { stringValue: groupName },
        createdAt: { timestampValue: new Date().toISOString() },
        founderId: { stringValue: founderId }
      }
    };
    await httpClient.post(groupDocUrl, groupDocBody);

    const membersUrl = firestoreHelper.getGroupMembersUrl(groupId);
    const memberDocBody = {
      fields: {
        userId: { stringValue: founderId },
        role: { stringValue: 'admin' }
      }
    };
    await httpClient.post(membersUrl, memberDocBody);

    return { success: true };
  }
}

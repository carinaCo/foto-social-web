//Expects a user-ID of the creator of the group and a group-ID (GUID)
//Created the group data structure in Firestore and sets the creator as user and admin

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class CreateGroup {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ groupId, founderId, groupName }) {
    const accessToken = await getFirestoreAccessToken();
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
    
    await httpClient.patch(groupDocUrl, groupDocBody);
  
    const membersUrl = firestoreHelper.getGroupUsersUrl(groupId);
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

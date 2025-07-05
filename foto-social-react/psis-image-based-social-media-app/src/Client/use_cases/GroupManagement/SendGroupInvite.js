//Expects the group-ID as well as the user-ID of the user to be invited
//Creates a document with the group-ID as document-ID in the collection of the group invites of the user to be invited

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class SendGroupInvite {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ userId, groupId }) {
    if (!userId) {
      throw new Error('Missing required parameter: userId');
    } else if (!groupId) {
      throw new Error('Missing required parameter: groupId');
    }

    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const documentUrl = `${firestoreHelper.baseFirestoreUrl}/Users/${userId}/GroupInvites?documentId=${groupId}`;

    const inviteData = {
      fields: {
        groupId: { stringValue: groupId },
        invitedAt: { timestampValue: new Date().toISOString() },
        status: { stringValue: 'pending' }
      }
    };

    await httpClient.post(documentUrl, inviteData);

    return {
      success: true,
      message: `User ${userId} has successfully been invited to join group ${groupId}`
    };
  }
}

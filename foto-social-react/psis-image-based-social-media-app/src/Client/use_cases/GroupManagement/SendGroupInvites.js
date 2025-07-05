//Takes a group ID and retrieves a list of users
//which have been invited by the admin, but have not accepted the invite yet

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class SendGroupInvites {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ groupId }) {
    if (!groupId) {
      throw new Error('Missing required parameter: groupId');
    }

    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const queryUrl = firestoreHelper.getRunQueryUrl();

    const requestBody = {
      structuredQuery: {
        from: [{ collectionId: 'Invites' }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'status' },
            op: 'EQUAL',
            value: { stringValue: 'pending' }
          }
        }
      },
      parent: `projects/${this.projectId}/databases/(default)/documents/Groups/${groupId}`
    };

    const response = await httpClient.post(queryUrl, requestBody);

    console.log('Raw Firestore response:', JSON.stringify(response, null, 2));

    const pendingInvites = response
      .filter(item => item.document)
      .map(item => {
        const doc = item.document;
        return {
          inviteId: doc.name.split('/').pop(),
          ...Object.fromEntries(
            Object.entries(doc.fields).map(([key, val]) => [key, Object.values(val)[0]])
          )
        };
      });

    return {
      success: true,
      pendingInvites
    };
  }
}

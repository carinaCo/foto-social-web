//Takes the user-ID of a user and retrieves a list of user-IDs, that have blocked this user
//This information is useful when an invite or message needs to not be sent to a blocked user

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GetBlockedByUserList {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ userId }) {
    if (!userId) {
      throw new Error('userId is required');
    }

    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const usersCollectionUrl = firestoreHelper.getUsersCollectionUrl();
    const usersResponse = await httpClient.listDocuments(usersCollectionUrl);

    if (!usersResponse || !Array.isArray(usersResponse.documents)) {
      return [];
    }

    const blockedBy = [];

    for (const userDoc of usersResponse.documents) {
      const blockerId = userDoc.name.split('/').pop();
      const blockedUsersUrl = firestoreHelper.getBlockedByUserListUrl(blockerId);

      const blockedListResponse = await httpClient.listDocuments(blockedUsersUrl);

      const blockedUsers = (blockedListResponse.documents || []).map(doc => {
        const fields = doc.fields || {};
        return fields.userId?.stringValue || null;
      });

      if (blockedUsers.includes(userId)) {
        blockedBy.push(blockerId);
      }
    }

    return blockedBy;
  }
}


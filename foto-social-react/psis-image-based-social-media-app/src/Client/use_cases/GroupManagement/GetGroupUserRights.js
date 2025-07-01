//TODO: Expects the group-ID and user-ID of a user
//and retrieves the permissions within the group (tells a normal user from admin apart)

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GetGroupUserRights {
  constructor({ projectId }) {
    this.projectId = projectId;
  }


}

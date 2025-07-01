//TODO: Selects a random prompt and returns it

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GetRandomPrompt {
  constructor({ projectId }) {
    this.projectId = projectId;
  }


}

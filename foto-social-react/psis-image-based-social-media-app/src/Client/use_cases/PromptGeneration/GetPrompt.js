//TODO: Selects a prompt and returns it -->
//checks if collection prompts exists for this group, if not --> create prompts collection
//check if prompts collection of this group has a prompt that was created after 12pm German Time
//If not, go to general random prompts collection and retrieve a random one
//if it does exist, return that prompt

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GetPrompt {
  constructor({ projectId }) {
    this.projectId = projectId;
  }




}

//TODO: Awaits a search string (part of a username)
//and retrieves a list of user IDs, where the usernames contain this string 
//Supports the User- and Friend search 

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class FindMatchingUsers {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ groupId, date }) {
    const accessToken = await getFirestoreToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    
  }
}
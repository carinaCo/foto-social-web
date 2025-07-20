//TODO: Expects the user-ID of the person who posted and the group ID, 
//Returns false if the user hasn't posted in the group on given day, true otherwise

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';
     
export class HasUserPostedInGroupToday {
  constructor({ projectId, databaseId = '(default)', storageBucket = "foto-social-web.firebasestorage.app" }) {
    this.projectId = projectId;
    this.databaseId = databaseId;
    this.storageBucket = storageBucket;
}

async execute({ userId, groupId }) {
  if (!userId || !groupId ) {
    throw new Error('Missing required parameter(s)');
  }
  
  const accessToken = await getFirestoreAccessToken();
  const firestoreHelper = new FirestoreCommunicationHelper({
    projectId: this.projectId,
    databaseId: this.databaseId
  });
  const httpClient = new HttpClient(accessToken);
     
         
  }
}
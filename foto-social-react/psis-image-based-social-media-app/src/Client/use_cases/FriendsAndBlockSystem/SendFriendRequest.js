//Expects the user-ID of the sending (logged in) user and the user-ID of the receiver
//Creates a document in the collection of the pending firend request list of the receiver with the ID of the user sending it

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class SendFriendRequest {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ userId, friendId }) {
    if (!userId) {
      throw new Error('Missing required parameter: userId');
    } else if(!friendId){
        throw new Error('Missing required parameter: friendId');
    }

    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    //Fetch sender's user document
  const senderDocUrl = `${firestoreHelper.baseFirestoreUrl}/Users/${userId}`;
  let isLoggedIn = false;

  try {
    const userDoc = await httpClient.get(senderDocUrl);
    isLoggedIn = userDoc.fields?.isLoggedIn?.booleanValue === true;
  } catch (err) {
    console.error('Failed to fetch user data:', err);
    return {
      success: false,
      error: 'Unable to verify user login status.'
    };
  }

  //Abort if not logged in
  if (!isLoggedIn) {
    return {
      success: false,
      error: 'User is not logged in.'
    };
  }

  //Send friend request to receiver’s PendingFriendRequests
  const pendingRequestUrl = `${firestoreHelper.baseFirestoreUrl}/Users/${friendId}/PendingFriendRequests`;

  try {
    await httpClient.post(pendingRequestUrl, {
      fields: {
        senderId: { stringValue: userId },
        requestedAt: { timestampValue: new Date().toISOString() }
      }
    });
  } catch (err) {
    console.error('Failed to send friend request:', err);
    return {
      success: false,
      error: 'Failed to send friend request. Please try again later.'
    };
  }

  return {
    success: true,
    message: `User ${userId} has successfully sent a friend request to user ${friendId}`
  };

  }
}
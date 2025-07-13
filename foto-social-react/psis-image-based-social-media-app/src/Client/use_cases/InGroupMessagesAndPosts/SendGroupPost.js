//Expects the user-ID of the person who posted, the group ID, post ID (GUID), 
//picture data (as Base 64-String) and a caption
//Stores the image reference in Firestore and the picture itself in the Firebase Storage

//TODO: modify url & body (upload of picture to storage --> 1 body, post to storage 
    //- answer: reference that has to be saved in firestore) - from response body take reference out

    /*
     image will be private, accessible only to authenticated users via authorized requests
    */

     import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
     import { HttpClient } from '../../../utils/httpClient.js';
     import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';
     
     export class SendGroupPost {
       constructor({ projectId, databaseId = '(default)', storageBucket }) {
         this.projectId = projectId;
         this.databaseId = databaseId;
         this.storageBucket = storageBucket;
       }
     
       async execute({ userId, groupId, postId, imageBase64 }) {
         if (!userId || !groupId || !postId || !imageBase64) {
           throw new Error('Missing required parameter(s)');
         }
     
         const accessToken = await getFirestoreAccessToken();
         const firestoreHelper = new FirestoreCommunicationHelper({
           projectId: this.projectId,
           databaseId: this.databaseId
         });
         const httpClient = new HttpClient(accessToken);
     
         const storagePath = `Posts/${postId}.jpg`;
         const uploadUrl = firestoreHelper.getGroupPostUploadUrl(storagePath);
         const imageBuffer = Buffer.from(imageBase64, 'base64');
         await httpClient.putBinary(uploadUrl, imageBuffer, 'image/jpeg');
     
         const imageReference = `https://firebasestorage.googleapis.com/v0/b/${this.storageBucket}/o/Posts%2F${postId}.jpg?alt=media`;
     
         const firestorePostUrl = `${firestoreHelper.getGroupPostsUrl(groupId)}/${postId}`;
         const timestamp = new Date().toISOString();
     
         const postBody = {
           fields: {
             createdAt: { timestampValue: timestamp },
             groupId: { stringValue: groupId },
             imageReference: { stringValue: imageReference },
             userId: { stringValue: userId }
           }
         };
     
         await httpClient.putJson(firestorePostUrl, postBody);
     
         return {
           success: true,
           message: `User ${userId} successfully posted to group ${groupId}`,
           imageReference
         };
       }
     }
     
     

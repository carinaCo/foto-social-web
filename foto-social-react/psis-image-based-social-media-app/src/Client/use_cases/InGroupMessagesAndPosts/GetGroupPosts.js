//Expects either the group-ID or also a date
//Retrieves all post-IDs, that have been generally created or starting with a certain date created in the group

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GetGroupPosts {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ groupId }) {
    if(!groupId){
      throw new Error('Missing required parameter: groupId');
  }
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const groupDocUrl = firestoreHelper.getGroupUrl(groupId);
    console.log("this is the groupDocurl : " + groupDocUrl);

    const groupResponse = await httpClient.get(groupDocUrl);
    console.log('groupResponse:', groupResponse);

    const postsCollectionUrl = firestoreHelper.getGroupPostsUrl(groupId);
    const postsResponse = await httpClient.listDocuments(postsCollectionUrl);

      const today = new Date();
      const todayUTCYear = today.getUTCFullYear();
      const todayUTCMonth = today.getUTCMonth();
      const todayUTCDate = today.getUTCDate();


      const posts = postsResponse.documents
          .map(doc => {
            const fields = doc.fields;
            return {
                postId: fields.postId?.stringValue || null,
                userId: fields.userId?.stringValue || null,
                time: fields.createdAt?.timestampValue || null
            };
          })
          .filter(post => post.postId)
          .filter(post => {
              if (!post.time) return false;
              const createdAt = new Date(post.time);
              return (
                  createdAt.getUTCFullYear() === todayUTCYear &&
                  createdAt.getUTCMonth() === todayUTCMonth &&
                  createdAt.getUTCDate() === todayUTCDate
              );
          });

      return {
      groupId,
      posts
    };

  }
}
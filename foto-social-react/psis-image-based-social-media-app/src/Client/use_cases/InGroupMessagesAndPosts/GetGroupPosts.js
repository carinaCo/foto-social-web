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
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);

    const groupDocUrl = firestoreHelper.getGroupUrl(groupId);
    console.log("this is the groupDocurl : " + groupDocUrl);

    const groupResponse = await httpClient.get(groupDocUrl);
    console.log('groupResponse:', groupResponse);

    const postsCollectionUrl = firestoreHelper.getGroupPostsUrl(groupId);
    const postsResponse = await httpClient.listDocuments(postsCollectionUrl);

    const postIds = postsResponse.documents.map(doc => {
      const fields = doc.fields;
      return fields.postId?.stringValue || null;
    }).filter(Boolean);

    return {
      groupId,
      posts: postIds
    };

  }
}
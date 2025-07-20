import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export const fetchImageReferenceByPostId = async (postId, groupId) => {
    const projectId = 'foto-social-web';
    const databaseId = '(default)';

    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId, databaseId });
    const httpClient = new HttpClient(accessToken);

    const postDocUrl = `${firestoreHelper.getGroupPostsUrl(groupId)}/${postId}`;
    const response = await httpClient.get(postDocUrl);

    return response.fields?.imageReference?.stringValue || null;
};
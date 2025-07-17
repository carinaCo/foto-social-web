import {SendGroupPost} from "../../Client/use_cases/InGroupMessagesAndPosts/SendGroupPost";
import {GetGroupPosts} from "../../Client/use_cases/InGroupMessagesAndPosts/GetGroupPosts";

export const sendGroupPost = async (
    userId: string,
    groupId: string,
    imageBase64: string
) => {
    try {
        const postId = crypto.randomUUID();
        const projectId = 'foto-social-web';
        const sendGroupPostInstance = new SendGroupPost({ projectId });

        const result = await sendGroupPostInstance.execute({
            userId,
            groupId,
            postId,
            imageBase64
        });
        console.log('sendGroupPost result:', result);
        return result;
    } catch (error) {
        console.error('Error in sendGroupPost:', error);
        throw error;
    }
};

export const getGroupPosts = async (groupId: string) => {
    try {
        const projectId = 'foto-social-web';
        const getGroupPostsInstance = new GetGroupPosts({ projectId });

        const result = await getGroupPostsInstance.execute({ groupId });
        console.log('getGroupPosts result:', result);
        return result;
    } catch (error) {
        console.error('Error in getGroupPosts:', error);
        throw error;
    }
};

export const fetchImageReference = async (postId: string, groupId: string) => {
    try {
        const { fetchImageReferenceByPostId } = await import(
            "../../Client/use_cases/InGroupMessagesAndPosts/GetImageReference.js"
            );
        const result = await fetchImageReferenceByPostId(postId, groupId);
        console.log('Success! fetchImageReference result:', result);
        return result;
    } catch (error) {
        console.error('Error in fetchImageReference:', error);
        throw error;
    }
};

export const fetchImageReferencesForGroup = async (groupId: string) => {
    try {
        const postsResult = await getGroupPosts(groupId);
        const results = await Promise.all(
            postsResult.posts.map(async (post) => {
                if(post?.postId){
                    const imageReference = await fetchImageReference(post.postId, groupId);
                    console.log('Image reference for post:' + post.postId, imageReference + ' with userId: ' + post.userId);
                    return {
                        userId: post.userId,
                        imageReference,
                    }
            }
            })
        );
        return results;
    } catch (error) {
        console.error('Error in fetchImageReferencesForGroup:', error);
        throw error;
    }
};
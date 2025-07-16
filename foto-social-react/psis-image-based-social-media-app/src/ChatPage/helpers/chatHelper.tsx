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
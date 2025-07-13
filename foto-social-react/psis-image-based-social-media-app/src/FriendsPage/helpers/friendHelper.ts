import {AddFriend} from "../../Client/use_cases/FriendsAndBlockSystem/AddFriend";
import {GetFriends} from "../../Client/use_cases/FriendsAndBlockSystem/GetFriends";

export const addFriend = async (
    userId: string, toAddUserId: string
) => {
    try {
        const projectId = 'foto-social-web';
        const addFriendInstance = new AddFriend({ projectId: projectId });

        const result = await addFriendInstance.execute({
            userId: userId,
            toAddUserId: toAddUserId
        });
        console.log('addFriend result:', result);
        return result;
    } catch (error) {
        console.error('Error in addFriend:', error);
        throw error;
    }
};

export const getFriends = async (userId: string) => {
    try {
        const projectId = 'foto-social-web';
        const getFriendsInstance = new GetFriends({ projectId });

        const result = await getFriendsInstance.execute({ userId });
        console.log('getFriends result:', result);
        return result;
    } catch (error) {
        console.error('Error in getFriends:', error);
        throw error;
    }
};
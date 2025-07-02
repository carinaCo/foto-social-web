import { CreateGroup } from "../../Client/use_cases/GroupManagement/CreateGroup.js";

export const createGroup = async (
    founderId: string,
    groupName: string
) => {
    try {
        // randomly generated group id when creating new group
        const groupId = crypto.randomUUID();
        const projectId = 'foto-social-web';
        const createGroupInstance = new CreateGroup({ projectId });

        // founder id should be current user id, since the acting user creates the group
        // how to get current user id?
        const result = await createGroupInstance.execute({
            groupId,
            founderId,
            groupName
        });

        console.log('createGroup result:', result);
        console.log('Created group name:', groupName);
        console.log('Group ID:', groupId);
        console.log('Founder ID:', founderId);

        return result;
    } catch (error) {
        console.error('Error in createGroup:', error);
        throw error;
    }
};
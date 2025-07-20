import { CreateGroup } from "../../Client/use_cases/GroupManagement/CreateGroup.js";
import {GetUserData} from "../../Client/use_cases/UserManagement/GetUserData";
//import {GetGroup} from "../../Client/use_cases/GroupManagement/GetGroup";
import {AddUserToGroup} from "../../Client/use_cases/GroupManagement/AddUserToGroup.js";

import {GetPrompt} from "../../Client/use_cases/PromptGeneration/GetPrompt";
import {GeneratePromptByUser} from "../../Client/use_cases/PromptGeneration/GeneratePromptByUser";
import * as GetGroup from "../../Client/use_cases/GroupManagement/GetGroup";

import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import {IconButton} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {HasUserPostedInGroupToday} from "../../Client/use_cases/InGroupMessagesAndPosts/HasUserPostedInGroupToday";

export const createGroup = async (
    founderId: string,
    groupName: string
) => {
    try {
        const groupId = crypto.randomUUID();
        const projectId = 'foto-social-web';
        const createGroupInstance = new CreateGroup({ projectId });

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

export const getUserData = async (userId: string) => {
    try {
        const projectId = 'foto-social-web';
        const getUserDataInstance = new GetUserData({ projectId });

        const userData = await getUserDataInstance.execute({ userId });

        console.log('Fetched user data: ', userData);
        return userData;
    } catch (error) {
        console.error('Error in getUserData:', error);
        throw error;
    }
}

export const getGroupData = async (groupId: string) => {
    const projectId = 'foto-social-web';
    const getGroupInstance = new GetGroup.GetGroup({ projectId });

    const groupData = await getGroupInstance.execute({ groupId });

    return groupData;
};

export const renderAppToolBarIconButton = (
    pathname: string, onAddClick?: () => void
) => {
    if (pathname === '/groups' || pathname === '/friends') {
        return (
            <IconButton
                size="large"
                edge="end"
                aria-label="library-add-icon"
                color="inherit"
                onClick={onAddClick}
            >
                <LibraryAddIcon/>
            </IconButton>
        )
    } else if (pathname === '/settings') {
        return (
            <IconButton
                size="large"
                edge="end"
                aria-label="logout"
                color="inherit"
                sx={{ ml: 2 }}
                onClick={onAddClick}
            >
                <LogoutIcon sx={{ color: "#d32f2f" }} />
            </IconButton>
        )
    } else {
        return (
            <IconButton
                size="large"
                edge="end"
                aria-label="library-add-icon"
                color="inherit"
                sx={{ visibility: 'hidden' }}
            >
                <LibraryAddIcon/>
            </IconButton>
        )
    }
}

const startDate = new Date('2024-01-01T00:00:00Z');

export const isCurrentPrompter = (UserID: string | undefined, groupData: GetGroup.GroupData) => {
    const now = Date.now(); // current time in ms
    const start = startDate.getTime(); // start time in ms

    const msPerDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const daysElapsed = Math.floor((now - start) / msPerDay);

    const index = daysElapsed % groupData.members.length;
    return groupData.members[index].userId === UserID
}

export const getPrompts = async (groupId: string) => {
    try {
        const projectId = 'foto-social-web';
        const getPromptDataInstance = new GetPrompt({ projectId });

        const prompts = await getPromptDataInstance.execute({ groupId });
        // console.log('getPromptData:', prompts);
        if (prompts.success){
            // if (prompts.previousDayPrompt.source==="fallback") {
            //     console.log('Fetched random prompt');
            // }
            // if (prompts.previousDayPrompt.source==="yesterday") {
            //     console.log('Fetched user generated prompt');
            // }
            return prompts
        }

        console.log('No success fetching the prompt: ', prompts);
        return prompts;
    } catch (error) {
        console.error('Error in getCurrentPrompt:', error);
        throw error;
    }
}

export const setPrompt = async (groupId : string, promptText : string) => {
    try {
        const projectId = 'foto-social-web';
        const setPromptDataInstance = new GeneratePromptByUser({projectId});

        return await setPromptDataInstance.execute({ groupId, promptText });
    } catch (error) {
        console.error('Error in setPrompt:', error);
        throw error;
    }
}
export const hasUserPostedInGroupToday = async (
    userId: string, groupId: string
) => {
    try {
        const projectId = 'foto-social-web';
        const hasUserPostedInstance = new HasUserPostedInGroupToday({ projectId });

        const result = await hasUserPostedInstance.execute({ userId, groupId });
        // console.log('hasUserPostedInGroupToday result:', result);
        return result;
    } catch (error) {
        console.error('Error in hasuserPostedInGroupToday:', error);
        throw error;
    }
}



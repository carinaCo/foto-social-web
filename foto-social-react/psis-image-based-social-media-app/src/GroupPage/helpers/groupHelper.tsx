import { CreateGroup } from "../../Client/use_cases/GroupManagement/CreateGroup.js";
import {GetUserData} from "../../Client/use_cases/UserManagement/GetUserData";
import * as GetGroup from "../../Client/use_cases/GroupManagement/GetGroup";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import {IconButton} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

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
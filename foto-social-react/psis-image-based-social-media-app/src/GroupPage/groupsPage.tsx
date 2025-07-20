import * as React from 'react';
import {
    AppBar, Box, CssBaseline
} from "@mui/material";
import GroupChat from "./groupChat.tsx";
import AppToolbar from "./AppToolbar.tsx";
import AddNewDrawer from "./AddNewDrawer.tsx";
import {useState} from "react";

const GroupsPage: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };
    const [groupsChanged, setGroupsChanged] = useState<boolean>(false);

    return (
        <>
            <CssBaseline enableColorScheme />
                    <AppBar>
                        <AppToolbar onAddClick={toggleDrawer(true)}/>
                    </AppBar>
            <Box sx={{
                width: '95vw',
                marginLeft: '-32px',
                marginRight: '-32px',
                boxSizing: 'border-box',
            }}>
                <GroupChat groupsChanged={groupsChanged} />
            </Box>

            <AddNewDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onGroupAdded={() => setGroupsChanged(prev => !prev)}
            />
        </>
    )
}

export default GroupsPage;

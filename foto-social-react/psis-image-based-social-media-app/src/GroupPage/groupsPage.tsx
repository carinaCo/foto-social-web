import * as React from 'react';
import {
    AppBar, Box, CssBaseline
} from "@mui/material";
import GroupChat from "./groupChat.tsx";
import AppToolbar from "./AppToolbar.tsx";
import AddNewDrawer from "./AddNewDrawer.tsx";

const GroupsPage: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

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
                <GroupChat />
            </Box>

            <AddNewDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    )
}

export default GroupsPage;

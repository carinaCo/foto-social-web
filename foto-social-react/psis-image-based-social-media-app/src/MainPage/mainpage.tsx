import * as React from 'react';
import {
    AppBar, Box, CssBaseline
} from "@mui/material";
import GroupChat from "./groupChat.tsx";
import AppToolbar from "./AppToolbar.tsx";
import NewGroupDrawer from "./newGroupDrawer.tsx";

const mainPageStyles = {
    chatBackground: {
        backgroundColor: '#1c1c1c', // dark background
        borderRadius: 4,            // 16px rounded corners (theme.spacing(4))
        paddingLeft: 3,
        paddingRight: 2, // internal padding
        margin: 2,                  // spacing around the box
        maxWidth: '1000px',
        height: '780px',
        mx: 'auto',                 // center horizontally
    }
}


const MainPage: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    return (
        <>
            <CssBaseline enableColorScheme />
                    <AppBar>
                        <AppToolbar onAddGroupClick={toggleDrawer(true)}/>
                    </AppBar>
            <Box sx={mainPageStyles.chatBackground} >
                <GroupChat />
            </Box>

            <NewGroupDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    )
}

export default MainPage;

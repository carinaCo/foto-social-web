import * as React from 'react';
import {
    AppBar, Box, CssBaseline
} from "@mui/material";
import GroupChat from "./groupChat.tsx";
import AppToolbar from "./AppToolbar.tsx";
import AddNewDrawer from "./AddNewDrawer.tsx";

const mainPageStyles = {
    chatBackground: {
        background: 'linear-gradient(145deg, #1E1F2F, #2C2E4A, #3B3E5C)',
        borderRadius: 4,            // 16px rounded corners (theme.spacing(4))
        paddingLeft: 2,
        paddingRight: 2, // internal padding
        margin: 2,                  // spacing around the box
        maxWidth: '100vw',
        height: '85vh',
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
            {/*<Box sx={mainPageStyles.chatBackground} >*/}
            {/*</Box>*/}
            <GroupChat />

            <AddNewDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    )
}

export default MainPage;

import * as React from 'react';
import {
    AppBar, Box, CssBaseline
} from "@mui/material";
import AppToolbar from "../MainPage/AppToolbar.tsx";

const globalPageStyles = {
    chatBackground: {
        backgroundColor: '#1c1c1c',
        borderRadius: 4,
        maxWidth: '1000px',
        height: '680px',
        width: '360px'
    }
}


const GlobalPromptPage: React.FC = () => {
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
        </>
    )
}

export default GlobalPromptPage;

import * as React from 'react';
import {
    AppBar, Box, CssBaseline
} from "@mui/material";
import AppToolBar from "./AppToolBar.tsx";
import BottomBeforeUpload from "./BottomBeforeUpload.tsx";
import ChatPageContent from './ChatPageContent.tsx';

const ChatPage: React.FC = () => {
    // const [drawerOpen, setDrawerOpen] = React.useState(false);
    // const toggleDrawer = (open: boolean) => () => {
    //     setDrawerOpen(open);
    // };

    return (
        <>
            <CssBaseline enableColorScheme />
                    <AppBar>
                        <AppToolBar/>
                    </AppBar>
            
                    <Box sx={{marginLeft: '-32px',
                             marginRight: '-32px',
                            //  paddingLeft: '16px',
                            //  paddingRight: '16px',
                                width: '95vw',
                             boxSizing: 'border-box',
                             }} >
                <ChatPageContent/>
            </Box>
                    
          
           <BottomBeforeUpload />
           
        </>
    )
}

export default ChatPage;

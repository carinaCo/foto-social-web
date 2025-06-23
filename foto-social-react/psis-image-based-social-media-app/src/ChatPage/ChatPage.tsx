import * as React from 'react';
import {
    AppBar, Box, CssBaseline, Container
} from "@mui/material";
import AppToolBar from "./AppToolBar.tsx";
import BottomBeforeUpload from "./BottomUpload.tsx";
import ChatPageContent from './HiddenChat.tsx';


// const chatPageStyles = {
//     chatBackground: {
//         backgroundColor: '#1c1c1c', // dark background
//         borderRadius: 4,            // 16px rounded corners (theme.spacing(4))
//         paddingLeft: 3,
//         paddingRight: 2, // internal padding
//         margin: 2,                  // spacing around the box
//         maxWidth: '1000px',
//         height: '780px',
//         mx: 'auto',                 // center horizontally
//     }
// }


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
                             boxSizing: 'border-box',
                             }} >
                <ChatPageContent />
            </Box>
                    
          
           <BottomBeforeUpload />
           
        </>
    )
}

export default ChatPage;

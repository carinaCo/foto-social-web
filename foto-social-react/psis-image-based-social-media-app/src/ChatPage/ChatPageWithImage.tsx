import * as React from 'react';
import {
    AppBar, Box, CssBaseline, 
} from "@mui/material";
import AppBarOnlyBack from "./AppBarOnlyBack.tsx";
//import BottomBeforeUpload from "./BottomBeforeUpload.tsx";
import ChatWithImage from './ChatWithImage.tsx';




const ChatPageWithImage: React.FC = () => {
    // const [drawerOpen, setDrawerOpen] = React.useState(false);
    // const toggleDrawer = (open: boolean) => () => {
    //     setDrawerOpen(open);
    // };

    return (
        <>
            <CssBaseline enableColorScheme />
                    <AppBar>
                        <AppBarOnlyBack/>
                    </AppBar>
            
                    <Box sx={{marginLeft: '-32px',
                             marginRight: '-32px',
                            //  paddingLeft: '16px',
                            //  paddingRight: '16px',
                             boxSizing: 'border-box',
                             }} >
                <ChatWithImage />
            </Box>
                    
          
           {/* <BottomBeforeUpload /> */}
           
        </>
    )
}

export default ChatPageWithImage;

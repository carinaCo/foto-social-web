import * as React from 'react';
import {
    AppBar, Avatar, CssBaseline, IconButton,
    List, ListItemAvatar,
    ListItemButton, ListItemText,
    Paper, Toolbar,
    Typography
} from "@mui/material";
import BottomBeforeUpload from "./BottomBeforeUpload.tsx";
import ChatPageContent from "./HiddenImageChat.tsx";
import AppToolbar from "./AppToolBar.tsx";
import ChatWithImage from './ChatWithImage.tsx';


const ChatPage: React.FC = () => {

    return (
        <>
            <CssBaseline enableColorScheme />
                    <AppBar>
                        <AppToolbar/>
                    </AppBar>
                <ChatWithImage/>
            <BottomBeforeUpload/>
        </>
    )
}
export default ChatPage;
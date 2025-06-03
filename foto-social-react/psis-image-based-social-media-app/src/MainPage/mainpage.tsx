import * as React from 'react';
import {
    AppBar, Avatar, CssBaseline, IconButton,
    List, ListItemAvatar,
    ListItemButton, ListItemText,
    Paper, Toolbar,
    Typography
} from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import BottomNavigationBar from "./bottomNavigationBar.tsx";
import GroupChat from "./groupChat.tsx";

interface mainPageProperties {
    name: string;
}


const MainPage: React.FC = () => {

    return (
        <>
            <CssBaseline enableColorScheme />
                    <AppBar>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                                Groups
                            </Typography>
                                <div>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                        <LibraryAddIcon />
                                    </IconButton>
                                </div>
                        </Toolbar>
                    </AppBar>
                <GroupChat/>
            <BottomNavigationBar/>
        </>
    )
}

export default MainPage;

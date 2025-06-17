import React from 'react';
import {Toolbar, Typography, IconButton, Avatar, Box,} from '@mui/material';
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import {pink} from "@mui/material/colors";

interface AppToolbarProps {
    onAddGroupClick: () => void;
}

const AppToolbar: React.FC<AppToolbarProps> = ({ onAddGroupClick }) => {
    return (
        <Toolbar>
            <IconButton
                size="large"
                aria-label="account-icon"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
            >
                <Avatar sx={{ bgcolor: pink[500] }}/>
            </IconButton>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h5" component="div">
                    Groups
                </Typography>
            </Box>
            <IconButton
                size="large"
                edge="end"
                aria-label="library-add-icon"
                color="inherit"
                onClick={onAddGroupClick}
            >
                <LibraryAddIcon />
            </IconButton>

        </Toolbar>
    );
};

export default AppToolbar;

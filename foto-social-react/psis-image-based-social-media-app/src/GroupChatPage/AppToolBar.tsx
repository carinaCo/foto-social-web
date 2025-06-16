import React from 'react';
import {Toolbar, Typography, IconButton, Box,} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const AppToolbar: React.FC = () => {
    return (
        <Toolbar>
        
            <IconButton
                size="large"
                aria-label="back-icon"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                
            >
                <ArrowBackIcon/>
            </IconButton>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" component="div" sx={{ lineHeight: 1 }}>
                    GroupName
                </Typography>
                <Typography variant="subtitle2" component="div" sx={{ lineHeight: 1 }}>
                    happyplace
                </Typography>
            </Box>
            <IconButton
                size="large"
                edge="end"
                aria-label="More-icon"
                color="inherit"
                
            >
                <MoreHorizIcon />
            </IconButton>

        </Toolbar>
    );
};

export default AppToolbar;
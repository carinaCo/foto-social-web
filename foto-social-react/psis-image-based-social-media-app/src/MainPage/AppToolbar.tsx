import React from 'react';
import {Toolbar, Typography, IconButton, Avatar, Box} from '@mui/material';
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useLocation } from 'react-router-dom';
import UserInfoPopover from "./UserInfoPopper.tsx";


interface AppToolbarProps {
    onAddClick?: () => void;
}

const AppToolbar: React.FC<AppToolbarProps> = ({ onAddClick }) => {
    const location = useLocation();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getTitle = () => {
        switch (location.pathname) {
            case '/groups':
                return 'Groups';
            case '/global':
                return 'Global';
            case '/friends':
                return 'Friends';
            case '/settings':
                return 'Settings';
            default:
                return 'PSIS - App';
        }
    };

    const userId = "0916843";

    return (
            <>
                <Toolbar sx={{
                    width: '100vw', background: '#3B3E5C',
                    boxShadow: '0 4px 12px rgba(163, 144, 238, 0.2)',
                    backdropFilter: 'blur(10px) saturate(180%)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <IconButton
                        size="large"
                        aria-label="account-icon"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleClick}
                    >
                        <Avatar sx={{bgcolor: '#6C63FF'}}/>
                    </IconButton>
                    <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
                        <Typography variant="h5" component="div" sx={{color: 'rgba(255,255,255,0.9)'}}>
                            {getTitle()}
                        </Typography>
                    </Box>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="library-add-icon"
                        color="inherit"
                        onClick={onAddClick}
                        sx={{visibility: location.pathname === '/groups' || location.pathname === '/friends' ? 'visible' : 'hidden'}}
                    >
                        <LibraryAddIcon/>
                    </IconButton>
                </Toolbar>
                    <UserInfoPopover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        userId={userId}
                        onClose={handleClose}
                    />
            </>
    );
};

export default AppToolbar;

import React from 'react';
import {Toolbar, Typography, IconButton, Avatar, Box, Alert, Snackbar} from '@mui/material';
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useLocation } from 'react-router-dom';
import UserInfoPopover from "./UserInfoPopper.tsx";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";


interface AppToolbarProps {
    onAddClick?: () => void;
}

const AppToolbar: React.FC<AppToolbarProps> = ({ onAddClick }) => {
    const location = useLocation();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [copiedId, setCopiedId] = React.useState<string | null>(null);

    const handleItemClick = (userId: string) => {
        navigator.clipboard.writeText(userId).then(() => {
            setCopiedId(userId);
            setSnackbarOpen(true);
            handleClose();
        });
    };

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

    // TODO atm noch hardcoded
    // const userId = "0a60fb39-d985-4543-8b3f-69aa79eb3839";
    const userId = "092ce280-8d97-45bc-a1a9-cedf9a95ff47";

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
                        onCopy={() => handleItemClick(userId)}
                    />
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={1500}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        severity="success"
                        icon={<CheckCircleIcon />}
                        sx={{
                            backdropFilter: 'blur(12px) saturate(180%)',
                            backgroundColor: 'rgba(180, 100, 255, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 2,
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 500,
                        }}
                        onClose={() => setSnackbarOpen(false)}
                    >
                        ID {copiedId} copied to clipboard!
                    </Alert>
                </Snackbar>
            </>
    );
};

export default AppToolbar;

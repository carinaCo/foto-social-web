import * as React from 'react';
import {
    AppBar, Box, Button,
    CssBaseline,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import AppToolbar from "../GroupPage/AppToolbar.tsx";
import SettingsIcon from "@mui/icons-material/Settings";
import {useNavigate} from "react-router-dom";
import ParticleLayer from "../GroupPage/ParticleLayer.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import {LogoutUser} from "../Client/use_cases/UserManagement/LogoutUser";


const SettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const { userId, logout } = useAuth();

    const handleLogoutClick = () => {
        setOpen(true);
    };
    const handleConfirmLogout = async () => {
        setOpen(false);
        const out = new LogoutUser({ projectId: 'foto-social-web' });
        const result = await out.execute({ userId });
        if (result.success) {
            logout();
            console.log('User logged out successfully');
            navigate('/login', {replace: true});
        } else {
            console.error('Logout failed: ', result.message);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <CssBaseline enableColorScheme />
            <ParticleLayer />
            <AppBar>
                <AppToolbar onAddClick={handleLogoutClick}/>
            </AppBar>

            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                }}
            >
                <SettingsIcon
                    sx={{
                        position: 'absolute',
                        filter: 'drop-shadow(0 0 30px rgba(140, 100, 225, 0.9))',
                        fontSize: { xs: 150, sm: 200, md: 300 },
                        color: 'rgba(108, 99, 255, 0.27)',
                        zIndex: 1,
                    }}
                />
            </Box>
            <Dialog
                open={open}
                onClose={handleCancel}
                slotProps={{
                    paper: {
                        sx: {
                            bgcolor: 'rgba(36,17,86,0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            backdropFilter: 'blur(6px)',
                            color: '#fff'
                        }
                    }
                }}
            >
                <DialogTitle>Logout bestätigen</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Möchtest du dich wirklich ausloggen?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Abbrechen
                    </Button>
                    <Button onClick={handleConfirmLogout} color="error" variant="contained">
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SettingsPage;

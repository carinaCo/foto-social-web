import * as React from 'react';
import {
    AppBar, Box, Button,
    CssBaseline,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import AppToolbar from "../GroupPage/AppToolbar.tsx";
import SettingsIcon from "@mui/icons-material/Settings";
import {useNavigate} from "react-router-dom";


const SettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleLogoutClick = () => {
        setOpen(true);
    };
    const handleConfirmLogout = () => {
        setOpen(false);
        navigate('/login', { replace: true });
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <CssBaseline enableColorScheme />
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

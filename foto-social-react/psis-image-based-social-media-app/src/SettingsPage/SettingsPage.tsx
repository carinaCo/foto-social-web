import * as React from 'react';
import {
    Box, Button,
    CssBaseline,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography
} from "@mui/material";
import AppToolbar from "../GroupPage/AppToolbar.tsx";
import PaletteIcon from '@mui/icons-material/Palette';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import {LogoutUser} from "../Client/use_cases/UserManagement/LogoutUser";
import {useColorMode} from "../context/ThemeContext.tsx";

const styles = {
    logoutTexts: {
        textShadow: '0 0 6px rgba(255,255,255,0.4)'
    }
}

const SettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const { userId, logout } = useAuth();

    const { setBackgroundColor, backgroundColor, availableColors } = useColorMode();

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
            <AppToolbar onAddClick={handleLogoutClick}/>
            <Box sx={{ mt: 10, textAlign: "center" }}>
                <PaletteIcon
                sx={{
                fontSize: 48,
                mb: 1,
                borderRadius: 2,
                backdropFilter: "blur(6px)",
                p: 1,
                display: "inline-block"
            }}
                />
                <Typography variant="h6" sx={styles.logoutTexts} gutterBottom>
                    Choose a theme (Beta)
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center", mt: 2 }}>
                    {availableColors.map((color) => (
                        <Button
                            key={color.value}
                            onClick={() => setBackgroundColor(color.value)}
                            sx={{

                                minWidth: "250px",
                                minHeight: "60px",
                                bgcolor: color.value,
                                color: "#fff",
                                borderRadius: "12px",
                                px: 2,
                                py: 1,
                                boxShadow: backgroundColor === color.value ? "0 0 12px rgba(255,255,255,0.6)" : "none",
                                border: backgroundColor === color.value ? "2px solid #fff" : "1px solid rgba(255, 255, 255, 0.1)",
                                "&:hover": {
                                    boxShadow: `0 0 16px 4px ${color.value}`,
                                    scale: 1.05,
                                },
                                textShadow: '0 0 6px rgba(255,255,255,0.8)',
                            }}
                        >
                            {color.name}
                        </Button>
                    ))}
                </Box>
            </Box>
            <Dialog
                open={open}
                onClose={handleCancel}
                slotProps={{
                    paper: {
                        sx: {
                            minWidth: '300px',
                            bgcolor: 'rgba(36,17,86,0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            backdropFilter: 'blur(6px)',
                            color: '#fff'
                        }
                    }
                }}
            >
                <DialogTitle sx={styles.logoutTexts}>Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary" sx={styles.logoutTexts}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmLogout} color="error" variant="contained" sx={styles.logoutTexts}>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SettingsPage;

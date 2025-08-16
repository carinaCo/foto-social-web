import React from "react";
import {
    Avatar, Box,
    Snackbar, Alert,
    Grid, Typography
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type {UserDataResult} from "../Client/use_cases/UserManagement/GetUserData";

interface friendsBoxProps {
    friends: UserDataResult[]
}

const FriendBox: React.FC<friendsBoxProps> = ({ friends }) => {
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [copiedId, setCopiedId] = React.useState<string | null>(null);

    const handleItemClick = (userId: string) => {
        navigator.clipboard.writeText(userId).then(() => {
            setCopiedId(userId);
            setSnackbarOpen(true);
        });
    };

    return (
        <>
            <Box>
                <Grid container spacing={{xs: 0, md: 2}} sx={{ pt: '64px', paddingBottom: '64px', mx: -4}}>
                    {friends.map((friend) => (
                            <Grid
                                key={friend.username + friend.userId}
                                size={{ xs: 12, md: 6, lg: 6 }}
                                onClick={() => handleItemClick(friend.userId)}
                                sx={{
                                    backdropFilter: 'blur(10px) saturate(180%)',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: {
                                        xs: 0,
                                        md: '12px'
                                    },
                                    borderBottom: {
                                        xs: '1px solid rgba(255, 255, 255, 0.1)',
                                        md: 'none'
                                    },
                                    border: {
                                        xs: 'none',
                                        md: '1px solid rgba(255, 255, 255, 0.1)'
                                    },
                                    p: 3,
                                    pt: 3,
                                    pb: 6,
                                    transition: '0.3s',
                                    '&:hover': {
                                        filter: 'brightness(1.2)',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
                                        transform: {xs: 'scaleY(1.01)', md: 'scale(1.01)'}
                                    }
                                }}
                            >
                                <Avatar color="primary" sx={{
                                    position: 'absolute',
                                    top: -32, // Hälfte der Avatar-Größe (z.B. 64px) nach oben verschieben
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: 64,
                                    height: 64,
                                    boxShadow: 3,
                                    border: '1px solid white'
                                }}/>
                                <Box display="flex" alignItems="center" gap={2} mb={1}>
                                    <Typography variant="h6" sx={{ justifyContent: 'center' }}>
                                        {friend.username}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', textAlign: 'left' }}>
                                    {friend.userId}
                                </Typography>
                            </Grid>
                    ))}
                </Grid>
            </Box>

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

export default FriendBox;
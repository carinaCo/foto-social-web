import * as React from "react";
import {
    Avatar, Box, List, ListItem, ListItemAvatar,
    ListItemText, Snackbar, Alert
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type {User} from "../Models/User.tsx";

interface friendsBoxProps {
    friends: User[]
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
            <Box sx={{
                height: "100%",
                width: '350px',
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none", // IE 10+
                "&::-webkit-scrollbar": {
                    width: 0, // Safari + Chrome
                    height: 0,
                },
            }}>
                <List sx={{ width: '100%'}}>
                    {friends.map((friend, index) => (
                        <React.Fragment key={index}>
                            <ListItem
                                key={friend.firstName + friend.userId}
                                alignItems="center"
                                onClick={() => handleItemClick(friend.userId)}
                                sx={{
                                    background: 'rgba(255, 255, 255, 0.01)',
                                    // backdropFilter: 'blur(10px)',
                                    filter: 'drop-shadow(0 0px 10px rgba(140, 100, 225, 0.7))',
                                    height: '90px',
                                    borderRadius: 3,
                                    marginBottom: 3,
                                    borderBottom: '1px solid rgba(90, 130, 130, 0.5)',
                                    px: 2,   // Innenabstand x
                                    py: 1.5,  // Innenabstand y
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        filter: 'brightness(1.1)', // leicht heller
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)', // sanfter Shadow
                                        transform: 'scale(1.01)', // minimal größer
                                        background: 'rgba(108, 100, 225, 0.3)'
                                    },
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar alt="Profile Picture" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={friend.firstName + ' ' + friend.lastName}
                                    secondary={'ID: ' + friend.userId}
                                />
                            </ListItem>
                        </React.Fragment>

                    ))}
                </List>
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
                        // backgroundColor: 'rgba(180, 100, 255, 0.2)', // die farbe war auch lit
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
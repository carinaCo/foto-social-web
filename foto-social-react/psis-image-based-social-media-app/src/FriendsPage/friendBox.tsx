import * as React from "react";
import {
    Avatar, Box,
    Divider, InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Stack, TextField,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

/**
 * sollte irgendwie mappen über einträge
 * ein eintrag pro gruppe -> ein component render i guess
 *
 */
const FriendBox: React.FC = ({
    friends
                             }) => {

    return (
        <Box sx={{ height: "100%", overflowY: "auto",
            scrollbarWidth: "none", // Firefox
            "&::-webkit-scrollbar": {
                display: "none", // Chrome/Safari
            }
        }}>
        <List sx={{ width: '100%', height: '100%', maxHeight: 1000, pt: 9}}>
                {friends.map((
                    element, index) =>
                    (
                        <React.Fragment key={element.id || index}>
                        <ListItem alignItems="center" key={index} sx={{
                            // background: 'linear-gradient(135deg, #1a1a1a, #292929, #1f3b4d)',
                            background: 'rgba(255, 255, 255, 0.05)', // transparenter Hintergrund
                            backdropFilter: 'blur(10px) saturate(180%)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 3,
                            marginBottom: 3,
                            px: 10,   // Innenabstand x
                            py: 1.5,  // Innenabstand y
                            transition: 'all 0.3s ease-in-out',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',

                            '&:hover': {
                                filter: 'brightness(1.1)', // leicht heller
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)', // sanfter Shadow
                                transform: 'scale(1.01)', // minimal größer
                            },
                        }}>
                            <ListItemAvatar>
                                <Avatar alt="Profile Picture"/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={element.name}
                            />
                        </ListItem>
                    </React.Fragment>
                    ))
                }
        </List>
        </Box>
    );
};

export default FriendBox;
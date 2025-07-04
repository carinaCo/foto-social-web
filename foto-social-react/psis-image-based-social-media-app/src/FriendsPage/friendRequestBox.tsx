import * as React from "react";
import {
    Avatar, Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Button,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import type {User} from "../Models/User.tsx";

// export interface FriendRequest {
//     id: number;
//     name: string;
// }

interface Props {
    requests: User[];
    onAccept: (id: number | undefined) => void;
    onReject: (id: number | undefined) => void;
}

/**
 * sollte irgendwie mappen über einträge
 * ein eintrag pro gruppe -> ein component render i guess
 *
 */
const FriendRequestBox: React.FC<Props> = ({
    requests,
    onAccept,
    onReject
}) => {
    return (
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
            <List sx={{ width: '100%' }}>
                {requests.map((
                    req) =>
                    (
                        <ListItem key={req.id} divider sx={{ width: '100%' }}>
                            <ListItemAvatar>
                                <Avatar alt="Profile Picture"/>
                            </ListItemAvatar>
                            <ListItemText primary={req.firstName} secondary={req.lastName} />
                            <ListItemSecondaryAction>
                                <Box sx={{ display: 'flex', gap: 1}}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => onAccept(req.id)}
                                    >
                                        <CheckIcon/>
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => onReject(req.id)}
                                    >
                                        <CloseIcon/>
                                    </Button>
                                </Box>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    );
};

export default FriendRequestBox;
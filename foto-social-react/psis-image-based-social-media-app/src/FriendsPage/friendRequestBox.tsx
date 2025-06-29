import * as React from "react";
import {
    Avatar, Box,
    Divider,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    TextField,
    ListItemSecondaryAction,
    Button,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';

export interface FriendRequest {
    id: number;
    name: string;
}

interface Props {
    requests: FriendRequest[];
    onAccept: (id: number) => void;
    onReject: (id: number) => void;
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

    const friendElements =
        [
            {id: 1, name: 'Dagobert'},
            {id: 2, name: '176-167 Knack'},
            {id: 3, name: 'Daniel Düsentrieb'},
            {id: 4, name: '671-761 Knack'},
            {id: 5, name: '176-671 Knack'},
        ];


    return (
        <Box sx={{ height: "100%", overflowY: "auto",
            scrollbarWidth: "none", // Firefox
            "&::-webkit-scrollbar": {
                display: "none", // Chrome/Safari
            }
        }}>
            <List sx={{ width: '100%', height: '100%', maxHeight: 1000, pt: 9}}>
                {requests.map((
                    req) =>
                    (
                        <ListItem key={req.id} divider>
                            <ListItemAvatar>
                                <Avatar alt="Profile Picture"/>
                            </ListItemAvatar>
                            <ListItemText primary={req.name} />
                            <ListItemSecondaryAction>
                                <Box sx={{ display: 'flex', gap: 1}}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleAccept(req.id)}
                                    >
                                        <CheckIcon/>
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleReject(req.id)}
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
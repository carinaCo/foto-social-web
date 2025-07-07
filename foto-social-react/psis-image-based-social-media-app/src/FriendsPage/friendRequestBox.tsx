import * as React from "react";
import {
    Avatar, Box,
    Button, Grid,
    Typography
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
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none", // IE 10+
            "&::-webkit-scrollbar": {
                width: 0, // Safari + Chrome
                height: 0,
            },
        }}>
            <Grid container spacing={1} sx={{ width: '100%' }}>
                {requests.map((req) => (
                    <Grid
                        req
                        key={req.userId}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        onClick={() => handleItemClick(friend.userId)}
                        sx={{
                            background: 'rgba(255, 255, 255, 0.01)',
                            // backdropFilter: 'blur(10px)',
                            filter: 'drop-shadow(0 0px 10px rgba(140, 100, 225, 0.7))',
                            overflow: 'hidden',
                            borderRadius: 3,
                            marginBottom: 3,
                            borderBottom: '1px solid rgba(90, 130, 130, 0.5)',
                            px: 2,   // Innenabstand x
                            py: 1.5,  // Innenabstand y
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                filter: 'brightness(1.1)', // leicht heller
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)', // sanfter Shadow
                                transform: 'scale(1.01)', // mixnimal größer
                                background: 'rgba(108, 100, 225, 0.3)'
                            },
                        }}
                    >
                        <Grid item key={req.id} divider sx={{ width: '100%' }}>
                            <Grid
                                container
                                alignItems="center"
                                spacing={2}
                                sx={{
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                    pb: 1,
                                }}
                            >
                                <Grid item>
                                    <Avatar alt="Profile Picture" />
                                </Grid>

                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        {req.firstName} {req.lastName}
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => onAccept(req.id)}
                                        >
                                            <CheckIcon />
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => onReject(req.id)}
                                        >
                                            <CloseIcon />
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
};

export default FriendRequestBox;
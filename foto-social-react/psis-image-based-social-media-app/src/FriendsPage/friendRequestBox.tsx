import * as React from "react";
import {
    Avatar, Box,
    Button, Grid,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import type {UserDataResult} from "../Client/use_cases/UserManagement/GetUserData";

// export interface FriendRequest {
//     id: number;
//     name: string;
// }

interface Props {
    requests: UserDataResult[];
    onAccept: (id: string | undefined) => void;
    onReject: (id: string | undefined) => void;
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
            <Grid container rowSpacing={0.5} columnSpacing={1}>
                {requests.map((req) => (
                    <Grid
                        key={req.userId}
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                            lg: 6
                        }}
                        sx={{
                            backdropFilter: 'blur(12px) saturate(180%)',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: 4,
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
                            border: '1px solid rgba(255,255,255,0.18)',
                            p: 2,
                            transition: '0.3s',
                            '&:hover': {
                                background: 'rgba(180, 100, 255, 0.18)',
                                boxShadow: '0 12px 32px 0 rgba(31, 38, 135, 0.28)',
                                transform: 'scale(1.03)'
                            }
                        }}
                    >
                        <Grid key={req.username} sx={{ width: '100%' }}>
                            <Grid
                                container
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid>
                                    <Avatar alt="Profile Picture" />
                                </Grid>

                                <Grid>
                                    <Typography variant="subtitle1">
                                        {req.username}
                                    </Typography>
                                </Grid>

                                <Grid>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => onAccept(req.userId)}
                                        >
                                            <CheckIcon />
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => onReject(req.userId)}
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
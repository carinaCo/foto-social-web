import React, { useState } from 'react';
import {
    AppBar,
    Box,
    CssBaseline,
    Paper,
    Typography,
    Tabs,
    Tab,
    List,
    Badge,
    IconButton,
    Toolbar, Container, Grid
} from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FriendBox from "./friendBox.tsx";
import FriendRequestBox from "./friendRequestBox.tsx";
import type {User} from "../Models/User.tsx";
import AppToolbar from "../GroupPage/AppToolbar.tsx";
import AddNewDrawer from "../GroupPage/AddNewDrawer.tsx";


const FriendsPage: React.FC = () => {
    //for addFriend/Group
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };
//for friends/friendrequests
    const [activeTab, setActiveTab] = useState<'friends' | 'requests'>('friends');

    const [friends, setFriends] = useState<User[]>([
        { id: 1, firstName: 'Donald', lastName: 'Duck', userId: '123456789' },
        { id: 1, firstName: 'Donald2', lastName: 'Duck2', userId: '123451789' },
        { id: 1, firstName: 'Donald3', lastName: 'Duck3', userId: '123446789' },
        { id: 1, firstName: 'Donald', lastName: 'Duck', userId: '123456789' },
        { id: 1, firstName: 'Donald2', lastName: 'Duck2', userId: '123451789' },
        { id: 1, firstName: 'Donald3', lastName: 'Duck3', userId: '123446789' },
        { id: 1, firstName: 'Donald', lastName: 'Duck', userId: '123456789' },
        { id: 1, firstName: 'Donald2', lastName: 'Duck2', userId: '123451789' },
        { id: 1, firstName: 'Donald3', lastName: 'Duck3', userId: '123446789' },
        { id: 1, firstName: 'Donald', lastName: 'Duck', userId: '123456789' },
        { id: 1, firstName: 'Donald2', lastName: 'Duck2', userId: '123451789' },
        { id: 1, firstName: 'Donald3', lastName: 'Duck3', userId: '123446789' },

    ]);
    const [friendRequests, setFriendRequests] = useState<User[]>([
        { id: 2, firstName: 'Tick', lastName: 'Duck', userId: '123456799' },
        { id: 3, firstName: 'Trick', lastName: 'Duck', userId: '123456749' },
    ]);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number | undefined) => {
        setActiveTab(newValue === 0 ? 'friends' : 'requests');
    };

    const handleAccept = (id: number | undefined) => {
        const user = friendRequests.find((r) => r.id === id);
        if (!user) return;
        setFriends((prev) => [...prev, user]);
        setFriendRequests((prev) => prev.filter((r) => r.id !== id));
    };

    const handleReject = (id: number | undefined) => {
        setFriendRequests((prev) => prev.filter((r) => r.id !== id));
    };

    const [showRequests, setShowRequests] = useState(false);

    const toggleRequests = () => setShowRequests((prev) => !prev);

    const pendingCount = friendRequests.length;

    return (
        <>
            <CssBaseline enableColorScheme />
            <AppBar>
                <AppToolbar onAddClick={toggleDrawer(true)}/>
                {pendingCount>0 && (
                    <IconButton color="inherit" onClick={toggleRequests}>
                        <Badge badgeContent={pendingCount} color="error">
                            <PeopleAltIcon />
                        </Badge>
                    </IconButton>
                )}

            </AppBar>

    <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
            {/* Friend Requests - Conditionally Rendered */}
            {showRequests && pendingCount > 0 && (
                <Grid item>
                    <Paper elevation={0} sx={{ bgcolor: 'transparent', boxShadow: 'none'}}>
                        <Typography variant="h6" gutterBottom>
                            Friend Requests
                        </Typography>
                        <List>
                            <FriendRequestBox
                                requests={friendRequests}
                                onAccept={handleAccept}
                                onReject={handleReject}
                            />
                        </List>
                    </Paper>
                </Grid>
            )}

            {/* Friends - Adjust width based on requests panel */}
            <Grid item>
                <Paper elevation={0} sx={{ bgcolor: 'transparent', boxShadow: 'none', p: 0 }}>
                    <Typography variant="h6" gutterBottom>
                        Your Friends
                    </Typography>
                    <FriendBox friends={friends} />
                </Paper>
            </Grid>
        </Grid>
    </Container>


            <AddNewDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    )
}

export default FriendsPage;

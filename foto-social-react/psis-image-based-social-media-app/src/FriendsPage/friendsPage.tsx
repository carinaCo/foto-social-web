import React, { useState } from 'react';
import {
    AppBar,
    CssBaseline,
    Paper,
    Typography,
    List,
    Badge,
    IconButton,
    Container, Grid,
    Box
} from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FriendBox from "./friendBox.tsx";
import FriendRequestBox from "./friendRequestBox.tsx";
import AppToolbar from "../GroupPage/AppToolbar.tsx";
import AddNewDrawer from "../GroupPage/AddNewDrawer.tsx";
import {getFriends} from "./helpers/friendHelper.ts";
import {getUserData} from "../GroupPage/helpers/groupHelper.tsx";
import type {UserDataResult} from "../Client/use_cases/UserManagement/GetUserData";


const FriendsPage: React.FC = () => {
    //for addFriend/Group
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    //for friends/friendrequests
    const [activeTab, setActiveTab] = useState<'friends' | 'requests'>('friends');

    const [friendRequests, setFriendRequests] = useState<UserDataResult[]>([
        { username: 'Tick Duck', userId: '123456799' },
        { username: 'Trick Duck', userId: '123456749' },
    ]);
    const [showRequests, setShowRequests] = useState(false);

    const [friends, setFriends] = useState<UserDataResult[]>([
        // { id: 1, firstName: 'Donald', lastName: 'Duck', userId: '123456789' },
        // { id: 1, firstName: 'Donald2', lastName: 'Duck2', userId: '123451789' },
        // { id: 1, firstName: 'Donald3', lastName: 'Duck3', userId: '123446789' },
        // { id: 1, firstName: 'Donald', lastName: 'Duck', userId: '123456789' },
        // { id: 1, firstName: 'Donald2', lastName: 'Duck2', userId: '123451789' },
        // { id: 1, firstName: 'Donald3', lastName: 'Duck3', userId: '123446789' },
        // { id: 1, firstName: 'Donald', lastName: 'Duck', userId: '123456789' },
        // { id: 1, firstName: 'Donald2', lastName: 'Duck2', userId: '123451789' },
        // { id: 1, firstName: 'Donald3', lastName: 'Duck3', userId: '123446789' },
        // { id: 1, firstName: 'Donald', lastName: 'Duck', userId: '123456789' },
        // { id: 1, firstName: 'Donald2', lastName: 'Duck2', userId: '123451789' },
        // { id: 1, firstName: 'Donald3', lastName: 'Duck3', userId: '123446789' },
    ]);
    const [friendIds, setFriendIds] = useState<string[]>([]);

    React.useEffect(() => {
        console.log('triggered useEffect in FriendsPage');
        const activeUserId = '0a60fb39-d985-4543-8b3f-69aa79eb3839'; // TODO: replace with actual user ID
        // Fetch friends for the active user
        const fetchFriends = async () => {
            try {
                const friendsResult = await getFriends(activeUserId);
                if (friendsResult?.success) {
                    console.log('Friends fetched successfully:', friendsResult.friends);
                    setFriendIds(friendsResult.friends);

                    // Hole für jede friendId die Userdaten
                    const userDataList = await Promise.all(
                        friendsResult.friends.map((id: string) => getUserData(id))
                    );
                    setFriends(userDataList);
                } else {
                    console.error('Failed to fetch friends:', friendsResult?.error);
                }
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        }
        void fetchFriends();
    }, []);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number | undefined) => {
        setActiveTab(newValue === 0 ? 'friends' : 'requests');
    };

    const handleAccept = (id: string | undefined) => {
        const user = friendRequests.find((r) => r.userId === id);
        if (!user) return;
        setFriends((prev) => [...prev, user]);
        setFriendRequests((prev) => prev.filter((r) => r.userId !== id));
    };

    const handleReject = (id: string | undefined) => {
        setFriendRequests((prev) => prev.filter((r) => r.userId !== id));
    };



    const toggleRequests = () => setShowRequests((prev) => !prev);

    const pendingCount = friendRequests.length;

    return (
        <>
            <CssBaseline enableColorScheme />
            <AppBar>
                <AppToolbar onAddClick={toggleDrawer(true)}/>
                {pendingCount > 0 && (
                    <Box>
                        <IconButton color="inherit" onClick={toggleRequests} sx={{
                            width: 40,
                            height: 40,
                            background: 'rgba(255,255,255,0.08)',
                            '&:hover': {
                                background: 'rgba(180, 100, 255, 0.18)'
                            }
                        }}>
                            <Badge badgeContent={pendingCount} color="error">
                                <PeopleAltIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                )}
            </AppBar>

    <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={1}>
            {showRequests && pendingCount > 0 ? (
                <Grid size={{xs: 12, md: 12, lg: 6}}>
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
            ) : (

                <Grid size={{xs: 12}}>
                    <Paper elevation={0} sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                        <FriendBox friends={friends} />
                    </Paper>
                </Grid>
                )}
        </Grid>
    </Container>


            <AddNewDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    )
}

export default FriendsPage;

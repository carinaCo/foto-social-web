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
import ParticleLayer from "../GroupPage/ParticleLayer.tsx";
import CircularProgress from '@mui/material/CircularProgress';


const FriendsPage: React.FC = () => {
    //for addFriend/Group
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };
    const [isLoading, setIsLoading] = React.useState(true);

    const [friendRequests, setFriendRequests] = useState<UserDataResult[]>([
        { username: 'Tick Duck', userId: '123456799' },
        { username: 'Trick Duck', userId: '123456749' },
    ]);
    const [showRequests, setShowRequests] = useState(false);

    const [friends, setFriends] = useState<UserDataResult[]>([]);

    React.useEffect(() => {
        setIsLoading(true);

        const activeUserId = '06aabba6-1002-4002-9840-2127decb9eea'; // TODO: replace with actual user ID
        // Fetch friends for the active user
        const fetchFriends = async () => {
            try {
                const friendsResult = await getFriends(activeUserId);
                if (friendsResult?.success) {
                    console.log('Friends fetched successfully:', friendsResult.friends);

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
            } finally {
                setIsLoading(false);
            }
        }
        void fetchFriends();
    }, []);

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
            <ParticleLayer />
            <AppBar>
                <AppToolbar onAddClick={toggleDrawer(true)} />
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

            {/* Content-Bereich */}
            <Box>
                {isLoading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2, mt: 8 }}>
                        Assembling the homies, give me a sec...
                        <CircularProgress />
                    </Box>
                ) : (
                    !friends || friends.length === 0 ? (
                        <Box>
                            No friends found.<br />
                            Please add some friends or wait for friend requests.
                        </Box>
                    ) : (
                        <Container maxWidth="lg" sx={{ mt: 4 }}>
                            <Grid container spacing={1}>
                                {showRequests && pendingCount > 0 ? (
                                    <Grid size={{ xs: 12, md: 12, lg: 6 }}>
                                        <Paper elevation={0} sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
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
                                    <Grid size={{ xs: 12 }}>
                                        <Paper elevation={0} sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                                            <FriendBox friends={friends} />
                                        </Paper>
                                    </Grid>
                                )}
                            </Grid>
                        </Container>
                    )
                )}
            </Box>

            <AddNewDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    )
}

export default FriendsPage;

import React, { useState } from 'react';
import {
    AppBar,
    Box,
    CssBaseline,
    Tabs,
    Tab,
    List,
} from "@mui/material";
import FriendBox from "./friendBox.tsx";
import FriendRequestBox from "./friendRequestBox.tsx";
import AppToolbar from "../MainPage/AppToolbar.tsx";
import AddNewDrawer from "../MainPage/AddNewDrawer.tsx";
import type {User} from "../Models/User.tsx";

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

    return (
        <>
            <CssBaseline enableColorScheme />
                    <AppBar>
                        <AppToolbar onAddGroupClick={toggleDrawer(true)}/>
                    </AppBar>
            {/*<Box sx={mainPageStyles.chatBackground} >*/}
            {/*</Box>*/}
            <Box sx={{ paddingTop: '1rem', paddingBottom: '4rem' /* leave space for nav bars */ }}>
                <Tabs
                    value={activeTab === 'friends' ? 0 : 1}
                    onChange={handleTabChange}
                    centered
                    variant="fullWidth"
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label="Friends" />
                    <Tab label="Friend Requests" />
                </Tabs>

                <Box sx={{ marginTop: 2 }}>
                    {activeTab === 'friends' && (
                        <FriendBox friends={friends} />
                    )}

                    {activeTab === 'requests' && (
                        <List>
                            <FriendRequestBox
                                requests={friendRequests}
                                onAccept={handleAccept}
                                onReject={handleReject}
                            />
                        </List>
                    )}
                </Box>
            </Box>

            <AddNewDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    )
}

export default FriendsPage;

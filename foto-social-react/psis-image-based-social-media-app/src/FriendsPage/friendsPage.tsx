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

const mainPageStyles = {
    friendsBackground: {
        background: 'linear-gradient(145deg, #1E1F2F, #2C2E4A, #3B3E5C)',
        borderRadius: 4,            // 16px rounded corners (theme.spacing(4))
        paddingLeft: 2,
        paddingRight: 2, // internal padding
        margin: 2,                  // spacing around the box
        maxWidth: '100vw',
        height: '85vh',
        mx: 'auto',                 // center horizontally
    }
}


const FriendsPage: React.FC = () => {
    //for addFriend/Group
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };
//for friends/friendrequests
    const [activeTab, setActiveTab] = useState<TabOption>('friends');

    const [friends, setFriends] = useState<User[]>([
        { id: 1, name: 'Donald' },
    ]);
    const [friendRequests, setFriendRequests] = useState<User[]>([
        { id: 2, name: 'Tick' },
        { id: 3, name: 'Trick' },
    ]);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue === 0 ? 'friends' : 'requests');
    };

    const handleAccept = (id: number) => {
        const user = friendRequests.find((r) => r.id === id);
        if (!user) return;
        setFriends((prev) => [...prev, user]);
        setFriendRequests((prev) => prev.filter((r) => r.id !== id));
    };

    const handleReject = (id: number) => {
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

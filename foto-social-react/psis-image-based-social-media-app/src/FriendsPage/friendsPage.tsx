import * as React from 'react';
import {
    AppBar, CssBaseline
} from "@mui/material";
import FriendBox from "./friendBox.tsx";
import AppToolbar from "../MainPage/AppToolbar.tsx";
import AddNewDrawer from "../MainPage/AddNewDrawer.tsx";


const FriendsPage: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    return (
        <>
            <CssBaseline enableColorScheme />
                    <AppBar>
                        <AppToolbar onAddClick={toggleDrawer(true)}/>
                    </AppBar>
            <FriendBox />
            <AddNewDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    )
}

export default FriendsPage;

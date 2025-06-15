import {BottomNavigation, BottomNavigationAction, Box, Paper} from "@mui/material";
import React from "react";
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactsIcon from '@mui/icons-material/Contacts';
import {useLocation, useNavigate} from "react-router-dom";

const routeIndexMap = [
    "/friends",   // index 0
    "/groups",    // index 1
    "/settings"   // index 2
];

const BottomNavigationBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // this gets the current index from the URL
    const currentIndex = routeIndexMap.findIndex(path => location.pathname.startsWith(path));

    // 'Groups' should be the default
    const [value, setValue] = React.useState(currentIndex !== -1 ? currentIndex : 1);

    const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
        setValue(newIndex);
        navigate(routeIndexMap[newIndex]);
    };

    return (
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={10}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={handleChange}
                    sx={{
                        bgcolor: '#1c1c1c'
                    }}
                >
                    <BottomNavigationAction label="Friends" icon={<ContactsIcon />} />
                    <BottomNavigationAction label="Groups" icon={<ChatIcon />} />
                    <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
                </BottomNavigation>
            </Paper>
    );
}

export default BottomNavigationBar;
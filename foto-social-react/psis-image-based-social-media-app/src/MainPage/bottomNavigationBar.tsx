import {BottomNavigation, BottomNavigationAction, Box, Paper} from "@mui/material";
import React from "react";
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactsIcon from '@mui/icons-material/Contacts';

const BottomNavigationBar: React.FC = () => {
    const [value, setValue] = React.useState(0);

    return (
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(_event, newValue) => {
                        setValue(newValue);
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
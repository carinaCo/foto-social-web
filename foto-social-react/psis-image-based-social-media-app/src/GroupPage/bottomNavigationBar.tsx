import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import React from "react";
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactsIcon from '@mui/icons-material/Contacts';
import {useLocation, useNavigate} from "react-router-dom";
import PublicIcon from '@mui/icons-material/Public';

const routeIndexMap = [
    "/friends",   // index 0
    "/global",   // index 0
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
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={10}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={handleChange}
                    sx={{
                        background: '#3B3E5C',
                        boxShadow: '0 4px 12px rgba(163, 144, 238, 0.2)',
                        filter: 'drop-shadow(0 0 30px rgba(140, 100, 225, 0.5))',
                        backdropFilter: 'blur(10px) saturate(180%)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        '& .Mui-selected': {
                            color: '#6C63FF', // selected color
                            filter: 'drop-shadow(0 0 4px rgba(108, 100, 225, 0.4))'
                        },
                        '& .MuiBottomNavigationAction-root.Mui-selected .MuiSvgIcon-root': {
                            color: '#6C63FF', // icon color
                            filter: 'drop-shadow(0 0 3px rgba(108, 100, 225, 0.4))',
                        },
                    }}
                >
                    <BottomNavigationAction label="Friends" icon={<ContactsIcon />} />
                    <BottomNavigationAction label="Global" icon={<PublicIcon />} />
                    <BottomNavigationAction label="Groups" icon={<ChatIcon />} />
                    <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
                </BottomNavigation>
            </Paper>
    );
}

export default BottomNavigationBar;
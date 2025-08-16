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
        <Paper
            sx={{
                position: 'fixed',
                bottom: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '95%',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                zIndex: 1200
            }}
            elevation={0} // Shadow kommt jetzt aus boxShadow
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={handleChange}
                sx={{
                    background: 'transparent',
                    '& .Mui-selected': {
                        color: '#ffffff',
                        textShadow: '0 0 6px rgba(255,255,255,0.6)',
                    },
                    '& .MuiBottomNavigationAction-root.Mui-selected .MuiSvgIcon-root': {
                        color: '#ffffff', //'#FF6B6B',
                        filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.4))',
                    },
                    '& .MuiBottomNavigationAction-label': {
                        fontWeight: 500
                    }
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
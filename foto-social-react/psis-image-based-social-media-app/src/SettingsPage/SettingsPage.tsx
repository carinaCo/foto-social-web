import * as React from 'react';
import {
    AppBar, Box,
    CssBaseline
} from "@mui/material";
import AppToolbar from "../MainPage/AppToolbar.tsx";
import SettingsIcon from "@mui/icons-material/Settings";


const SettingsPage: React.FC = () => {

    return (
        <>
            <CssBaseline enableColorScheme />
            <AppBar>
                <AppToolbar />
            </AppBar>

            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                }}
            >
                <SettingsIcon
                    sx={{
                        position: 'absolute',
                        filter: 'drop-shadow(0 0 30px rgba(140, 100, 225, 0.9))',
                        fontSize: { xs: 150, sm: 200, md: 300 },
                        color: 'rgba(108, 99, 255, 0.27)',
                        zIndex: 1,
                    }}
                />
            </Box>
        </>
    );
}

export default SettingsPage;

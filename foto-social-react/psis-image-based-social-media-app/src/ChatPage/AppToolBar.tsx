import React from 'react';
import {Toolbar, Typography, IconButton, Box, AppBar,} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useLocation, useParams, useNavigate } from "react-router-dom";

const AppToolBar: React.FC = () => {
    const navigate = useNavigate();              // 获取跳转函数
    const location = useLocation();
    const { name } = useParams<{ name: string }>();
    // 从 location.state 读取传递的群组名
  const groupName = location.state?.groupName || `Group ${name}`;
  const promptToday = location.state?.promptToday || 'undefined';

    return (
        <AppBar>
        <Toolbar
            sx={{
                position: 'fixed',
                top: 10,
                right: 0,
                height: 64,
                zIndex: 1100,
                borderRadius: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '95%',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                px: 2
            }}
        >
            <IconButton
                size="large"
                aria-label="back-icon"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={() => navigate("/groups")}  // 点击时跳转回主页
            >
                <ArrowBackIcon/>
            </IconButton>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
                <Typography variant="h5" component="div" sx={{
                    color: 'rgba(255,255,255,0.95)',
                    fontWeight: 600,
                    textShadow: '0 0 6px rgba(255,255,255,0.4)'
                }}>
                {groupName}
                </Typography>
                <Typography variant="h6" component="div" sx={{ lineHeight: 1 }}>
                {promptToday}
                </Typography>
            </Box>
            <IconButton
                sx={{ visibility: 'hidden' }}
                size="large"
                edge="end"
                aria-label="More-icon"
                color="inherit"
            >
                <LockOpenIcon />
            </IconButton>

        </Toolbar>
        </AppBar>
    );
};

export default AppToolBar;

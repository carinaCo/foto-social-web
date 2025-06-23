import React from 'react';
import {Toolbar, Typography, IconButton, Box,} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useLocation, useParams, useNavigate } from "react-router-dom";

const AppToolBar: React.FC = () => {
    const navigate = useNavigate();              // 获取跳转函数
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    // 从 location.state 读取传递的群组名
  const groupname = location.state?.groupName || `Group ${id}`;
  const prompttoday = location.state?.promptToday || 'undefined';

    return (
        <Toolbar   sx={{
            width: '100vw', background: '#3B3E5C',
            boxShadow: '0 4px 12px rgba(163, 144, 238, 0.2)',
            backdropFilter: 'blur(10px) saturate(180%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
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
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" component="div" sx={{ lineHeight: 1 }}>
                {groupname}  {/* 这里用变量显示传递过来的群组名 */}
                </Typography>
                <Typography variant="subtitle2" component="div" sx={{ lineHeight: 1 }}>
                {prompttoday}
                </Typography>
            </Box>
            <IconButton
                size="large"
                edge="end"
                aria-label="More-icon"
                color="inherit"
            >
                <MoreHorizIcon />
            </IconButton>

        </Toolbar>
    );
};

export default AppToolBar;

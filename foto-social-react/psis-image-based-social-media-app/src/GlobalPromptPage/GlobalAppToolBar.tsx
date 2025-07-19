import React, { useState } from 'react';
import {Avatar, Toolbar, Typography, IconButton, Box, Popover, } from '@mui/material';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CameraCapture from './CameraCapture';

const GlobalAppToolBar: React.FC = () => {
    const navigate = useNavigate();              // 获取跳转函数
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    // 从 location.state 读取传递的群组名
 // const prompttoday = location.state?.promptToday || 'undefined';

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [uploadAnchorEl, setUploadAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [cameraOpen, setCameraOpen] = useState(false);


    // 打开上传方式 Popover, open upload
    const handleUploadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUploadAnchorEl(event.currentTarget);
  };
    const handleCloseUploadPopover = () => {
      setUploadAnchorEl(null);
    };

    const handleSelectFromGallery = () => {
        console.log("用户选择：从图库选择, user select image from gallery");
        // 这里添加打开文件选择器的逻辑
        fileInputRef.current?.click(); // 触发 input 打开文件选择, open local folder 
        handleCloseUploadPopover();
      };

    const handleUseCamera = () => {
        console.log("用户选择：使用相机, use camera");
        // 这里添加打开摄像头的逻辑
        setCameraOpen(true);
        handleCloseUploadPopover();
    };
    
    const handlePhotoCaptured = (imageData: string) => {
        console.log('拍到的图片photo in base64:', imageData);
        // TODO: 上传到服务器、展示预览等, send to backend,server...
      };
      


    const open = Boolean(uploadAnchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
        <Toolbar   sx={{
            width: '100vw', background: '#3B3E5C',
            boxShadow: '0 4px 12px rgba(163, 144, 238, 0.2)',
            backdropFilter: 'blur(10px) saturate(180%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
        >
            <IconButton
                        size="large"
                        aria-label="account-icon"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleClick}
                    >
                        <Avatar sx={{bgcolor: '#6C63FF'}}/>
                    </IconButton>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" component="div" sx={{ lineHeight: 1 }}>
                    Global
                {/* {groupname}   */}
                </Typography>
                <Typography variant="subtitle2" component="div" sx={{ lineHeight: 1 }}>
                    Today's Prompt
                {/* {prompttoday} */}
                </Typography>
            </Box>
            <IconButton
                size="large"
                edge="end"
                aria-label="upload image"
                color="inherit"
                onClick={handleUploadClick}
               
            >
                <AddPhotoAlternateIcon />
            </IconButton>

        </Toolbar>
        <Popover
        open={open}
        anchorEl={uploadAnchorEl}
        onClose={handleCloseUploadPopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
            paper: {
              sx: {
                backgroundColor: 'rgba(43, 46, 74, 0.75)', // 深蓝 + 半透明
                backdropFilter: 'blur(10px) saturate(150%)', // 磨砂
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                color: '#fff',
                p: 1,
              }
            }
          }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
          <IconButton onClick={handleSelectFromGallery} sx={{ justifyContent: 'flex-start' }}>
            <PhotoLibraryIcon sx={{ mr: 1 }} />
            <Typography variant="body2">From Gallery</Typography>
          </IconButton>
          <IconButton onClick={handleUseCamera} sx={{ justifyContent: 'flex-start' }}>
            <CameraAltIcon sx={{ mr: 1 }} />
            <Typography variant="body2">Use Camera</Typography>
          </IconButton>
        </Box>
      </Popover>

      <CameraCapture
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={handlePhotoCaptured}
      />

      {/* 隐藏的文件选择器, folder select */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            console.log('用户选择了 user select file：', file.name);
            // TODO: 上传逻辑或跳转
          }
        }}
      />
    </>
      
    
    );
};

export default GlobalAppToolBar;

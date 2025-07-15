import React, { useState, useRef } from 'react';
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Typography,
  Stack,
} from '@mui/material';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CancelIcon from '@mui/icons-material/Cancel';
import CameraCapture from '../GlobalPromptPage/CameraCapture';





const BottomBeforeUpload: React.FC = () => {
  
    const [expanded, setExpanded] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [cameraOpen, setCameraOpen] = useState(false);

    const handleToggleExpand = () => {
      setExpanded((prev) => !prev);
    };

  // 点击 Cancel 收回扩展栏, click cancel button
    const handleCancel = () => {
      setExpanded(false);
    };

    const handleSelectFromGallery = () => {
      console.log("用户选择：从图库选择, user select image from gallery");
      // 这里添加打开文件选择器的逻辑
      fileInputRef.current?.click(); // 触发 input 打开文件选择, open local folder 
      handleCancel();
    };

    const handleUseCamera = () => {
      console.log("用户选择：使用相机, use camera");
      // 这里添加打开摄像头的逻辑
      setCameraOpen(true);
      //handleCancel();
    };

    const handlePhotoCaptured = (imageData: string) => {
      console.log('拍到的图片photo in base64:', imageData);
      // TODO: 上传到服务器、展示预览等, send to backend,server...
    };

    

    
    



    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0,
            // 动态高度，展开时为两倍高度（128px），收起时默认56px
        height: expanded ? 128 : 56,
        transition: 'height 0.3s ease',
        overflow: 'hidden',
        }} 
            elevation={10}>
            
            
           
        {/* 底部导航栏 */}
      {!expanded && (
        <BottomNavigation showLabels value={0} 
        sx={{
          background: '#3B3E5C',
          boxShadow: '0 4px 12px rgba(163, 144, 238, 0.2)',
          filter: 'drop-shadow(0 0 30px rgba(140, 100, 225, 0.5))',
          backdropFilter: 'blur(10px) saturate(180%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
         <BottomNavigationAction
          label="upload an image"
          icon={<AddPhotoAlternateIcon />}
          onClick={handleToggleExpand}
         />
        </BottomNavigation>
      )}
      {/* 扩展栏 */}
      {expanded && (
        <Box
          sx={{
            height: '100%',
            px: 2,
            pt: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#3B3E5C',
            boxShadow: '0 4px 12px rgba(163, 144, 238, 0.2)',
            filter: 'drop-shadow(0 0 30px rgba(140, 100, 225, 0.5))',
            backdropFilter: 'blur(10px) saturate(180%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* 横向图标按钮组 */}
          <Stack direction="row" spacing={4} justifyContent="center" alignItems="center">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={handleUseCamera}
            >
              <CameraAltIcon sx={{ fontSize: 40 }} />
              <Typography variant="subtitle2">Camera</Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={handleSelectFromGallery}
            >
              <PhotoLibraryIcon sx={{ fontSize: 40 }} />
              <Typography variant="subtitle2">Gallery</Typography>
            </Box>

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
          </Stack>
          

          {/* Cancel 按钮 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 1,
              cursor: 'pointer',
            }}
            onClick={handleCancel}
          >
            <CancelIcon sx={{ fontSize: 30, mr: 1 }} />
            <Typography variant="subtitle2">Cancel</Typography>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default BottomBeforeUpload;

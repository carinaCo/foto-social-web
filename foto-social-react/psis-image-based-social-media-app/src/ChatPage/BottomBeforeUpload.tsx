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





const BottomBeforeUpload: React.FC = () => {
  
    const [expanded, setExpanded] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null); // 引用隐藏的文件输入框
    // 点击 upload 切换展开/收回状态
    const handleToggleExpand = () => {
      setExpanded((prev) => !prev);
    };

  // 点击 Cancel 收回扩展栏
    const handleCancel = () => {
      setExpanded(false);
    };

    // 处理选择图片后上传
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await fetch('http://localhost:3001/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        console.log('上传成功:', data);
        alert('上传成功！文件名：' + data.filename);
      } catch (err) {
        console.error('上传失败:', err);
        alert('上传失败，请稍后再试');
      }
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
              onClick={() => alert('Camera selected')}
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
              onClick={() => fileInputRef.current?.click()}// onClick={() => alert('Gallery selected')}
            >
              <PhotoLibraryIcon sx={{ fontSize: 40 }} />
              <Typography variant="subtitle2">Gallery</Typography>
            </Box>

            {/*  隐藏的文件选择器 */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
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

import React, { useState } from 'react';
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  IconButton,
  Typography,
  Stack,
} from '@mui/material';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CancelIcon from '@mui/icons-material/Cancel';





const BottomBeforeUpload: React.FC = () => {
    const [expanded, setExpanded] = useState(false);
    // 点击 upload 切换展开/收回状态
    const handleToggleExpand = () => {
      setExpanded((prev) => !prev);
    };

  // 点击 Cancel 收回扩展栏
    const handleCancel = () => {
      setExpanded(false);
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
            bgcolor: '#1c1c1c'
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
            bgcolor: '#1c1c1c'
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
              onClick={() => alert('Gallery selected')}
            >
              <PhotoLibraryIcon sx={{ fontSize: 40 }} />
              <Typography variant="subtitle2">Gallery</Typography>
            </Box>
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
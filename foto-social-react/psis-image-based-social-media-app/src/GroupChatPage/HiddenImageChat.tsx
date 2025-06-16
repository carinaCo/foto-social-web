import React from 'react';
//import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
//import IconButton from '@mui/material/IconButton';
//import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HideImageIcon from '@mui/icons-material/HideImage';
//import Toolbar from '@mui/material/Toolbar';

interface ChatItem {
    id: number;
    username: string;
    //avatarUrl: string;
    hasImage: boolean;
    imageUrl: string;
  }

const sampleChats: ChatItem[] = [
 {
   id: 1,
   username: 'Alice',
   //avatarUrl: 'https://i.pravatar.cc/150?img=1',
   hasImage: true,
   imageUrl: 'https://placekitten.com/300/200'
 },
 {
   id: 2,
   username: 'Bob',
   //avatarUrl: 'https://i.pravatar.cc/150?img=2',
   hasImage: true,
   imageUrl: 'https://placekitten.com/300/210'
  },
  {
    id: 3,
    username: 'Cara',
    //avatarUrl: 'https://i.pravatar.cc/150?img=1',
    hasImage: true,
    imageUrl: 'https://placekitten.com/300/200'
  },
  {
    id: 4,
    username: 'Daniel',
    //avatarUrl: 'https://i.pravatar.cc/150?img=2',
    hasImage: true,
    imageUrl: 'https://placekitten.com/300/210'
   },
    // 更多聊天项...
];

 const getAvatarColor = (userId: string) => {
   const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
   const index = userId.charCodeAt(userId.length - 1) % colors.length;
   return colors[index];
  };

  const ChatPageContent: React.FC = () => {
    

    return (
      <Box display="flex" flexDirection="column" > 
      {/* height="100vh" */}
        {/* <Toolbar> */}
        
        
  
        {/* 中部聊天区域 */}
        <Box
         
          pt={8} pb={8} 
          pl={2} pr={2}  // 左右内边距 5 * 8 = 40px
          flexGrow={1}
          overflow="auto"
          bgcolor="grey.500"
        //   p={2}
        >
          {sampleChats.map((chat) => (
            <Box
              key={chat.id}
              display="flex"
              alignItems="flex-start"
              mb={2}
            >
              
              <Avatar sx={{ bgcolor: getAvatarColor(chat.username) }}>
                 {chat.username[0].toUpperCase()}
              </Avatar>
              <Box ml={2}>
                <Typography fontWeight="bold">{chat.username}</Typography>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width={300}
                  height={200}
                  bgcolor="grey.300"
                  borderRadius={2}
                >
                 <HideImageIcon sx={{ fontSize: 64, color: 'grey.600' }} />
                </Box>

              </Box>

            </Box>    
          ))}

          
         
        </Box>
  
      {/* </Toolbar>  */}
      </Box>
    );
  };

  export default ChatPageContent;
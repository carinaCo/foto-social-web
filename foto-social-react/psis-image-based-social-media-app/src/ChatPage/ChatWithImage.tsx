import React from 'react';
//import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
//import IconButton from '@mui/material/IconButton';
//import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//import Toolbar from '@mui/material/Toolbar';
import choco from '../assets/choco.jpg';
import straydog from '../assets/straydog.png';
import {   
    List,
    ListItem,
    ListItemAvatar,
} from "@mui/material";



const ChatWithImage: React.FC = () => {

    const sampleChats =
        [
            {id: 1, userName: 'Alice', hasImage: true, imageUrl: choco },
            {id: 2, userName: 'Bob', hasImage: true, imageUrl: straydog },
            {id: 3, userName: 'Cara', hasImage: false, imageUrl: 'https://placekitten.com/300/200' },
            {id: 4, userName: 'Daniel', hasImage: false, imageUrl: 'https://placekitten.com/300/210' },
            
        ];
    const getAvatarColor = (userId: string) => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
        const index = userId.charCodeAt(userId.length - 1) % colors.length;
        return colors[index];
        };
    
    const visibleChats = sampleChats.filter(chat => chat.hasImage);

    return (
        
        <Box sx={{
            
         height: "100%", width: "100%", overflowY: "auto" }}>

        <List sx={{ width: '100%', height: '100%', maxHeight: 1000, pt: 9}}>
                {visibleChats.map((
                    element, index) =>
                    (
                        <React.Fragment key={element.id || index}>
                        <ListItem alignItems="center" key={index} sx={{
                            background: 'rgba(255, 255, 255, 0.05)', // transparenter Hintergrund
                            backdropFilter: 'blur(10px) saturate(180%)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 3,
                            marginBottom: 3,
                            px: 2,   // Innenabstand x
                            py: 1.5,  // Innenabstand y
                            transition: 'all 0.3s ease-in-out',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                            

                            '&:hover': {
                                filter: 'brightness(1.1)', // leicht heller
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)', // sanfter Shadow
                                transform: 'scale(1.01)', // minimal größer
                            },
                        }}>
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: getAvatarColor(element.userName) }}>
                                 {element.userName[0].toUpperCase()}
                              </Avatar>
                            </ListItemAvatar>
                            
                            
                            <Box ml={2}>
                            <Typography fontWeight="bold">{element.userName}</Typography>
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            //   width={200}
                            //   height={150}
                            //   borderRadius={2}
                              component="img"
                              src={element.imageUrl}
                              alt={`${element.userName}'s upload`}
                              sx={{ width: '100%', height: '100%', borderRadius: 2, objectFit: 'cover' }}
                            >
                            
                            </Box>
                            </Box>        
                            {/* </Box> */}
                        </ListItem>
                    </React.Fragment>
                    ))
                }
        </List>
        </Box>
        
    );
};

export default ChatWithImage;

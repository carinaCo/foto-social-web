import React from 'react';
import Typography from '@mui/material/Typography';
import HideImageIcon from '@mui/icons-material/HideImage';
//import Toolbar from '@mui/material/Toolbar';
import {
    Avatar, Box,
    Divider, InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Stack, TextField, Container
} from "@mui/material";


const ChatPageContent: React.FC = () => {

    const sampleChats =
        [
            {id: 1, userName: 'Alice', hasImage: true, imageUrl: 'https://placekitten.com/300/200' },
            {id: 2, userName: 'Bob', hasImage: true, imageUrl: 'https://placekitten.com/300/210' },
            {id: 3, userName: 'Cara', hasImage: true, imageUrl: 'https://placekitten.com/300/200' },
            {id: 4, userName: 'Daniel', hasImage: true, imageUrl: 'https://placekitten.com/300/210' },
            
        ];
    const getAvatarColor = (userId: string) => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
        const index = userId.charCodeAt(userId.length - 1) % colors.length;
        return colors[index];
        };
    

    return (
        
        <Box sx={{
            
         height: "100%", width: "100%", overflowY: "auto" }}>

        <List sx={{ width: '100%',  maxWidth: '1000px', height: '100%', maxHeight: 1000, p: 0, bgcolor: '#1c1c1c'}}>
                {sampleChats.map((
                    element, index) =>
                    (
                        <React.Fragment key={element.id || index}>
                        <ListItem alignItems="center" key={index} sx={{
                            background: 'linear-gradient(135deg, #1a1a1a, #292929, #1f3b4d)',
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
                              width={300}
                              height={200}
                              bgcolor="grey.300"
                              borderRadius={2}
                            >
                              
                
                               <HideImageIcon sx={{ fontSize: 64, color: 'grey.600' }} />
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

export default ChatPageContent;
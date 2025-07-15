import React from 'react';
import Typography from '@mui/material/Typography';
import PhotoIcon from '@mui/icons-material/Photo';
//import Toolbar from '@mui/material/Toolbar';
import {
    Avatar, Box,
    Divider, InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Stack, TextField, Container
} from "@mui/material";


const GlobalPosts: React.FC = () => {

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

        <List sx={{ width: '100%', height: '100%', maxHeight: 1000, pt: 9}}>
                {sampleChats.map((
                    element, index) =>
                    (
                        <React.Fragment key={element.id || index}>
                        <ListItem alignItems="center" key={index} sx={{
                            background: 'rgba(255, 255, 255, 0.01)', // transparenter Hintergrund
                            //backdropFilter: 'blur(10px) saturate(180%)',
                            //border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 3,
                            marginBottom: 3,
                            px: 2,   // Innenabstand x
                            py: 1.5,  // Innenabstand y
                            transition: 'all 0.3s ease-in-out',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                           
                            filter: 'drop-shadow(0 0px 10px rgba(140, 100, 225, 0.7))',
                           
                            borderBottom: '1px solid rgba(90, 130, 130, 0.5)',
                           
                           

                            '&:hover': {
                                filter: 'brightness(1.1)', // leicht heller
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)', // sanfter Shadow
                                transform: 'scale(1.01)', // minimal größer
                                background: 'rgba(108, 100, 225, 0.3)'
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
                              width={200}
                              height={150}
                              bgcolor="grey.300"
                              borderRadius={2}
                            >
                              
                
                               <PhotoIcon sx={{ fontSize: 64, color: 'grey.600' }} />
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

export default GlobalPosts;

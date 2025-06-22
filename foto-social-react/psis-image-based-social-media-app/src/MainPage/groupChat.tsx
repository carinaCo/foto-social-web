import * as React from "react";
import {
    Avatar, Box,
    Divider, InputAdornment,
    List,
    ListItemAvatar,
    ListItemText, Stack, TextField,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
//import { Link as RouterLink } from "react-router-dom";
import ListItem from '@mui/material/ListItem';

/**
 * sollte irgendwie mappen über einträge
 * ein eintrag pro gruppe -> ein component render i guess
 *
 */
const GroupChat: React.FC = () => {
    const navigate = useNavigate();


    const groupElements =
        [
            {id: 1, groupName: 'Die wilden Kerle', promptToday: 'Happy Place', promptTomorrow: 'Tasty Food' },
            {id: 2, groupName: 'Die zweite Gruppe', promptToday: 'Wetter', promptTomorrow: 'Coole Wolke' },
            {id: 3, groupName: 'Die dritte Gruppe', promptToday: 'Pflanze', promptTomorrow: 'Litter Baum' },
            {id: 4, groupName: 'Die vierte Gruppe', promptToday: 'Selfie', promptTomorrow: 'Landschaft' },
            {id: 5, groupName: 'Die fünfte Gruppe', promptToday: 'Dies Das', promptTomorrow: 'Ananas' },
        ];

    const isPromptFieldDisabled = false;

    return (
        <Box sx={{ height: "100%", overflowY: "auto",
            scrollbarWidth: "none", // Firefox
            "&::-webkit-scrollbar": {
                display: "none", // Chrome/Safari
            }
        }}>
        <List sx={{ width: '100%', height: '100%', maxHeight: 1000, pt: 9}}>
                {groupElements.map((
                    element, index) =>
                    (
                        <React.Fragment key={element.id || index}>

                       
                            

                        <ListItem alignItems="center" key={index} sx={{
                            cursor: "pointer",
                            // background: 'linear-gradient(135deg, #1a1a1a, #292929, #1f3b4d)',
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
                        }}
                        onClick={() =>
                            navigate(`/chat/${element.id}`, { state: { groupName: element.groupName , promptToday: element.promptToday,} })
                          }
                        >
                            <ListItemAvatar>
                                <Avatar alt="Group Picture"/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={element.groupName}
                                secondary={
                                <Stack direction="column" spacing={2}>
                                    <TextField id={'prompt-field-today' + element.id} label={'Heute'} variant="outlined" size="small" slotProps=
                                        {{
                                            input: {
                                                readOnly: true,
                                                disabled: true,
                                            }}}
                                               value={element.promptToday}

                                    />
                                    <TextField id={'prompt-field-tomorrow' + element.id} label={'Morgen'} variant="outlined" size="small" slotProps=
                                        {{
                                            input: {
                                                disabled: isPromptFieldDisabled,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <EditIcon fontSize={'small'} />
                                                    </InputAdornment>
                                                )
                                            }}}
                                    />
                                </Stack>}
                                slotProps={{secondary: {component: 'div'}}}
                            />
                        </ListItem>
                    </React.Fragment>
                    ))
                }
        </List>
        </Box>
    );
};

export default GroupChat;
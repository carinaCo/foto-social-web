import * as React from "react";
import {
    Avatar,
    Divider, InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Stack, TextField,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

/**
 * sollte irgendwie mappen über einträge
 * ein eintrag pro gruppe -> ein component render i guess
 *
 */
const GroupChat: React.FC = () => {

    const groupElements =
        [
            {id: 1, groupName: 'Die wilden Kerle', promptToday: 'Happy Place', promptTomorrow: 'Tasty Food' },
            {id: 2, groupName: 'Die zweite Gruppe', promptToday: 'Wetter', promptTomorrow: 'Coole Wolke' },
            {id: 3, groupName: 'Die dritte Gruppe', promptToday: 'Pflanze', promptTomorrow: 'Litter Baum' },
            {id: 4, groupName: 'Die vierte Gruppe', promptToday: 'Selfie', promptTomorrow: 'Landschaft' },
            {id: 5, groupName: 'Die fünfte Gruppe', promptToday: 'Dies Das', promptTomorrow: 'Ananas' },
        ];

    // TODO: 'Heute' field sollte disabled sein, wenn der Prompt festgelegt ist
    const isPromptFieldDisabled = false;

    return (
        <List sx={{ width: '100%', maxWidth: '1000px', height: '100%', maxHeight: 1000, bgcolor: '#1c1c1c' }}>
                {groupElements.map((
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
                                <Avatar alt="Group Picture"/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={element.groupName}
                                secondary={
                                <Stack direction="row" spacing={2}>
                                    <TextField id={'prompt-field-today' + element.id} label={'Heute'} variant="outlined" size="small" slotProps=
                                        {{
                                            input: {
                                                disabled: isPromptFieldDisabled,
                                            }}}

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
                            {/*{index < groupElements.length - 1 && (*/}
                            {/*    <Divider variant="inset" component="li" sx={{paddingBottom: '15px'}}/>*/}
                            {/*)}*/}
                    </React.Fragment>
                    ))
                }
        </List>
    );
};

export default GroupChat;
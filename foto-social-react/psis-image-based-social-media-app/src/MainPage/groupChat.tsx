import * as React from "react";
import {
    Avatar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText, Stack, TextField,
    Typography
} from "@mui/material";

/**
 * sollte irgendwie mappen über einträge
 * ein eintrag pro gruppe -> ein component render i guess
 *
 */
const GroupChat: React.FC = () => {

    const groupElements =
        [
            {id: 1, groupName: 'Die wilden Kerle', promptToday: 'Happy Place', promptTomorrow: 'Tasty Food' },
            {id: 2, groupName: 'Die zweite Gruppe', promptToday: 'Wetter', promptTomorrow: 'Coole Wolke' }
        ];

    return (
        <List sx={{ width: '100%', maxWidth: '1000px', height: '100%', maxHeight: 1000, bgcolor: '#1c1c1c' }}>
                {groupElements.map((
                    element, index) =>
                    (
                        <React.Fragment key={element.id || index}>
                        <ListItem alignItems="center" key={index}>
                            <ListItemAvatar>
                                <Avatar alt="Group Picture"/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={element.groupName}
                                secondary={
                                <Stack direction="row" spacing={2}>
                                    <TextField id={'prompt-field-today' + element.id} label={element.promptToday} variant="outlined" size="small"/>
                                    <TextField id={'prompt-field-tomorrow' + element.id} label={element.promptTomorrow} variant="outlined"
                                               size="small"
                                    />
                                </Stack>}
                                slotProps={{secondary: {component: 'div'}}}
                            />
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                    </React.Fragment>
                    ))
                }
        </List>
    );
};

export default GroupChat;
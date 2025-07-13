import * as React from "react";
import {
    Avatar, Box,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Stack, TextField,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import TurnDialog from "../Prompting/components/TurnDialog.tsx";
import {useNavigate} from "react-router-dom";
import {getGroupData, getUserData, isCurrentPrompter} from "./helpers/groupHelper.tsx";
import type {GroupData} from "../Client/use_cases/GroupManagement/GetGroup";
import type {UserDataResult} from "../Client/use_cases/UserManagement/GetUserData";
import ParticleLayer from "./ParticleLayer.tsx";

const styles = {
    listItem: {
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
        }
    }
};

const GroupChat: React.FC = () => {

    const [openDialog, setOpenDialog] = React.useState(false);
    const navigate = useNavigate();
    const [userData, setUserData] = React.useState<UserDataResult | null>(null);
    const [groups, setGroups] = React.useState<GroupData[] | null>(null);

    React.useEffect(() => {
        console.log('useEffect called in GroupChat');
        const fetchUserData = async () => {
            try {
                // TODO: user id nicht mehr hardcoden
                const userId = '0a60fb39-d985-4543-8b3f-69aa79eb3839';
                const data = await getUserData(userId);
                console.log('await getuserdata called');
                setUserData(data);
                // console.log("Fetched user data:", data);

                if (data.groupId && data.groupId.length > 0) {
                    const groupPromises = data.groupId.map((groupId) => getGroupData(groupId));
                    const groupResults = await Promise.all(groupPromises);
                    console.log('promise all await called');

                    // console.log("Group results:", groupResults);
                    setGroups(groupResults);
                } else {
                    console.log("User ist in keiner Gruppe.");
                    setGroups([]); // leeren, falls keine Gruppen
                }
            } catch (error) {
                console.error("Fehler beim Laden der Userdaten:", error);
            }
        };

        // damit nicht wegen promise gemeckert wird
        void fetchUserData();
    }, []);

    // React.useEffect(() => {
    //     const isUserTurn = true; // Replace with actual logic
    //     if (isUserTurn) {
    //         const timer = setTimeout(() => {
    //             setOpenDialog(true);
    //         }, 2000);
    //
    //         return () => clearTimeout(timer);
    //     }
    // }, []);

    const groupElements =
        [
            {id: 1, groupName: 'Die wilden Kerle', promptToday: 'Happy Place', promptTomorrow: 'Tasty Food' },
            {id: 2, groupName: 'Die zweite Gruppe', promptToday: 'Wetter', promptTomorrow: 'Coole Wolke' },
            {id: 3, groupName: 'Die dritte Gruppe', promptToday: 'Pflanze', promptTomorrow: 'Litter Baum' },
            {id: 4, groupName: 'Die vierte Gruppe', promptToday: 'Selfie', promptTomorrow: 'Landschaft' },
            {id: 5, groupName: 'Die fünfte Gruppe', promptToday: 'Dies Das', promptTomorrow: 'Ananas' },
        ];


    return (
        <>
            <ParticleLayer />
            {!groups || groups?.length === 0 ?
                (
                <Box>
                    Seems a bit empty in here...
                </Box>
            ) :
                (
                <>
                    <TurnDialog open={openDialog} onClose={() => setOpenDialog(false)} groupName={groups[0].name}/>
                    <Box sx={{
                        height: "100%",
                        width: "100%",
                        overflowY: "auto",
                        scrollbarWidth: "none", // Firefox
                        "&::-webkit-scrollbar": {
                            display: "none", // Chrome/Safari
                        }
                    }}>
                        <List sx={{ width: '100%', height: '100%', maxHeight: 1000, pt: 6}}>
                            {groups.map((
                                element, index) =>
                                (
                                    <React.Fragment key={element.name || index}>
                                        <ListItem alignItems="center" key={index} sx={ styles.listItem }>
                                            <ListItemAvatar>
                                                <Avatar alt="Group Picture"
                                                        onClick={() =>
                                                            navigate(`/chat/${element.name}`, {
                                                                state: {
                                                                    groupName: element.name,
                                                                    promptToday: element?.promptToday || 'No prompt found...',
                                                                },
                                                            })
                                                        }

                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={element.name}
                                                slotProps={{
                                                    primary: { sx: { textAlign: "center" } },
                                                    secondary: { component: "div" }
                                                }}
                                                secondary={
                                                    <Stack direction="column" spacing={2}>
                                                        <TextField id={'prompt-field-today' + index} label={'Heute'} variant="outlined" size="small" slotProps=
                                                            {{
                                                                input: {
                                                                    readOnly: true,
                                                                    disabled: true,
                                                                }}}
                                                                   value={element?.promptToday || 'No prompt found...'}

                                                        />
                                                        <TextField id={'prompt-field-tomorrow' + index} label={'Morgen'} variant="outlined" size="small" slotProps=
                                                            {{
                                                                input: {
                                                                    disabled: isCurrentPrompter(userId, element),
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <EditIcon fontSize={'small'} />
                                                                        </InputAdornment>
                                                                    )
                                                                }}}
                                                        />
                                                    </Stack>}
                                            />
                                        </ListItem>
                                    </React.Fragment>
                                ))
                            }
                        </List>
                    </Box>
                </>
                )
            }
        </>
    );
};

export default GroupChat;
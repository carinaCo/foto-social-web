import * as React from "react";
import {
    Avatar, Box, Button,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Stack, TextField,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import TurnDialog from "../Prompting/components/TurnDialog.tsx";
import {useNavigate} from "react-router-dom";
import {getGroupData, getUserData, getPrompts, setPrompt} from "./helpers/groupHelper.tsx";
import type {PromptResult} from "../Client/use_cases/PromptGeneration/GetPrompt";
import type {GroupData} from "../Client/use_cases/GroupManagement/GetGroup";
import type {UserDataResult} from "../Client/use_cases/UserManagement/GetUserData";
import ParticleLayer from "./ParticleLayer.tsx";
import LoadingPlaceholder from "../ReuseableGenericComponents/LoadingPlaceholder.tsx";
import toast from "react-hot-toast";

const styles = {
    listItem: {
            background: 'rgba(255, 255, 255, 0.05)', // transparenter Hintergrund
            backdropFilter: 'blur(10px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
            marginBottom: 1.5,
            px: 2,   // Innenabstand x
            py: 1.5,  // Innenabstand y
            transition: 'all 0.3s ease-in-out',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',

            '&:hover': {
            filter: 'brightness(1.2)', // leicht heller
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
    const [prompts, setPrompts] = React.useState<PromptResult[] | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        console.log('useEffect called in GroupChat');
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                // TODO: user id nicht mehr hardcoden
                const userId = '06aabba6-1002-4002-9840-2127decb9eea';

                const data = await getUserData(userId);

                console.log('await getuserdata called');
                setUserData(data);
                console.log("Fetched user data:", data);

                if (data.groupId && data.groupId.length > 0) {
                    const groupPromises = data.groupId.map((groupId) => getGroupData(groupId));
                    const groupResults = await Promise.all(groupPromises);
                    console.log('promise all await called for groups');

                    // console.log("Group results:", groupResults);
                    setGroups(groupResults);
/*
                    const setPromptPromises = data.groupId.map((groupId) => setPrompt(groupId, "Klausurenphase"));
                    await Promise.all(setPromptPromises);
                    console.log('promise all await called for set prompts');
 */
                    const promptPromises = data.groupId.map((groupId) => getPrompts(groupId));
                    const promptResults = await Promise.all(promptPromises);
                    console.log('promise all await called for prompts');
                    if (promptResults.length > 0){
                        setPrompts(promptResults);
                    }
                    else{setPrompts([])}
                } else {
                    console.log("User ist in keiner Gruppe.");
                    setGroups([]); // leeren, falls keine Gruppen
                    setPrompts([]);
                }
            } catch (error) {
                console.error("Fehler beim Laden der Userdaten:", error);
            } finally {
                setIsLoading(false);
            }
        };
        // damit nicht wegen promise gemeckert wird
        void fetchUserData();
    }, []);

    const handleClick = (element: GroupData, index: number) => {
        if (!element.groupId) {
            // Optional: Fehlerbehandlung oder Hinweis
            return;
        }
        navigate(`/chat/${element.groupId}/${(element.name)}`, {
            state: {
                groupName: element.name,
                promptToday: prompts?.[index].todayPrompt?.prompt || 'No prompt found...',
            },
        });
    };
    const handlePromptSave = async (groupId: string, promptText: string, index: number) => {
        if (promptText.trim().length === 0) {
            toast.error('Empty prompts are laaame >:(');
            return;
        }
        try {
            await setPrompt(groupId, promptText);
            toast.success('Prompt erfolgreich gespeichert!');
            // Prompts neu laden
            const newPrompts = await getPrompts(groupId);
            setPrompts((prev) => {
                if (!prev) return prev;
                const updated = [...prev];
                updated[index] = newPrompts;
                return updated;
            });
        } catch (error) {
            toast.error('Fehler beim Speichern des Prompts.');
            console.error('Error saving prompt:', error);
        }
    };

    const [tomorrowPrompts, setTomorrowPrompts] = React.useState<string[]>([]);

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



    if (isLoading) {
        return (
            <LoadingPlaceholder message={'Chill bro, im loading atm...'}/>
        );
    }

    return (
        <>
            <ParticleLayer />
            {!groups || groups?.length === 0 ?
                (
                    <Box>
                        No groups found.<br />
                        Please create a group or join an existing one.
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
                                                            handleClick(element, index)}
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
                                                                   value={prompts?.[index].previousDayPrompt.prompt || 'No prompt found...'}

                                                        />
                                                                <TextField
                                                                    id={'prompt-field-tomorrow' + index}
                                                                    label={'Morgen'}
                                                                    variant="outlined"
                                                                    size="small"
                                                                    value={prompts?.[index].todayPrompt?.prompt ?? tomorrowPrompts[index]}
                                                                    slotProps={{
                                                                        input: {
                                                                            disabled: !!prompts?.[index].todayPrompt?.prompt,
                                                                            endAdornment:
                                                                                <InputAdornment position="end">
                                                                                    {(tomorrowPrompts[index] || '').trim().length > 0 ? (
                                                                                        <Button
                                                                                            size="small"
                                                                                            variant="contained"
                                                                                            sx={{backgroundColor: '#5A54D1'}}
                                                                                            onClick={async () => {
                                                                                                await handlePromptSave(element.groupId, tomorrowPrompts[index], index);
                                                                                            }}
                                                                                        >
                                                                                            okay
                                                                                        </Button>
                                                                                    ) : (
                                                                                        <EditIcon fontSize={'small'} />
                                                                                    )}
                                                                                </InputAdornment>
                                                                        },
                                                                    }}
                                                                    onChange={(e) => {
                                                                        const newPrompts = [...tomorrowPrompts];
                                                                        newPrompts[index] = e.target.value;
                                                                        setTomorrowPrompts(newPrompts);
                                                                    }}
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
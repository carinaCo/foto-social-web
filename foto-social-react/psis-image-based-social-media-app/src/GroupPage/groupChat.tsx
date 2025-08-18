import * as React from "react";
import {
    Avatar, Box, Button,
    InputAdornment,
    Grid, Stack, TextField,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { getGroupData, getUserData, isCurrentPrompter, getPrompts, setPrompt } from "./helpers/groupHelper.tsx";
import type { PromptResult } from "../Client/use_cases/PromptGeneration/GetPrompt";
import type { GroupData } from "../Client/use_cases/GroupManagement/GetGroup";
import LoadingPlaceholder from "../ReuseableGenericComponents/LoadingPlaceholder.tsx";
import { useAuth } from "../context/AuthContext.tsx";
import toast from "react-hot-toast";
import CheckIcon from '@mui/icons-material/Check';
import EmptyContentPlaceholder from "../ReuseableGenericComponents/EmptyContentPlaceholder.tsx";

const styles = {
    gridItem: {
        position: 'relative',
        backdropFilter: 'blur(10px) saturate(180%)',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: {
            xs: 0,
            md: 3
        },
        borderBottom: {
            xs: '1px solid rgba(255, 255, 255, 0.1)',
            md: 'none'
        },
        border: {
            xs: 'none',
            md: '1px solid rgba(255, 255, 255, 0.1)'
        },
        padding: 3,
        transition: 'all 0.3s ease-in-out',
        boxShadow: {
        xs: 'none',
        md: '0 2px 4px rgba(0, 0, 0, 0.3)'
        },
        '&:hover': {
            filter: 'brightness(1.2)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
            transform: {xs: 'scaleY(1.01)', md: 'scale(1.01)'}
        }
    },
};

interface GroupChatProps {
    groupsChanged: boolean;
}

const GroupChat: React.FC<GroupChatProps> = ({ groupsChanged }) => {
    const [groups, setGroups] = React.useState<GroupData[] | null>(null);
    const [prompts, setPrompts] = React.useState<PromptResult[] | null>(null);
    const [tomorrowPrompts, setTomorrowPrompts] = React.useState<string[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const { userId } = useAuth();
    const navigate = useNavigate();
    console.log('die group data: ', groups);

    const emptyContentMessage =
        <>
            No groups found.<br />
            Please create a group or join an existing one.
        </>

    React.useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const data = await getUserData(userId);

                if (data.groupId && data.groupId.length > 0) {
                    const groupPromises = data.groupId.map((groupId) => getGroupData(groupId));
                    const groupResults = (await Promise.all(groupPromises))
                        .filter(group => group.groupId !== 'a058d8c8-9b5d-4ac7-b630-cbb0378b3368');
                    setGroups(groupResults);

                    const promptPromises = groupResults.map((group) => getPrompts(group.groupId));
                    const promptResults = await Promise.all(promptPromises);
                    setPrompts(promptResults.length > 0 ? promptResults : []);
                } else {
                    setGroups([]);
                    setPrompts([]);
                }
            } catch (error) {
                console.error("Fehler beim Laden der Userdaten:", error);
            } finally {
                setIsLoading(false);
            }
        };
        void fetchUserData();
    }, [groupsChanged]);

    const handleClick = (element: GroupData, index: number) => {
        if (!element.groupId) return;
        navigate(`/chat/${element.groupId}/${(element.name)}`, {
            state: {
                groupName: element.name,
                promptToday: prompts?.[index].previousDayPrompt?.prompt || 'No prompt found...',
            }
        });
    };

    const handlePromptSave = async (groupId: string, promptText: string, index: number) => {
        if (promptText.trim().length === 0) {
            toast.error('Bruh, mach doch kein Leerzeichen...');
            return;
        }
        try {
            await setPrompt(groupId, promptText);
            toast.success('Hell yeah, prompt gespeichert!');
            const newPrompts = await getPrompts(groupId);
            setPrompts((prev) => {
                if (!prev) return prev;
                const updated = [...prev];
                updated[index] = newPrompts;
                return updated;
            });
        } catch (error) {
            toast.error('Ups, sry prompt fehler oder so...');
            console.error('Error saving prompt:', error);
        }
    };

    if (isLoading) {
        return <LoadingPlaceholder message={'Chill bro, im loading atm...'} />;
    }
    const isSingleItem = groups && groups.length === 1;

    return (
        <>
            {!groups || groups.length === 0 ? (
                <EmptyContentPlaceholder message={emptyContentMessage}/>
            ) : (
                <Box>
                        <Grid container spacing={{xs: 0, md: 2}} sx={{ pt: '80px', paddingBottom: '64px', mx: -4 }} justifyContent={isSingleItem ? 'center' : 'flex-start'}>
                            {groups
                                .filter(element => element.groupId !== 'a058d8c8-9b5d-4ac7-b630-cbb0378b3368')
                                .map((element, index) => (
                                    <Grid
                                        size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
                                        key={element.groupId || index}
                                        sx={styles.gridItem}
                                    >
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                            gap={2}
                                        >
                                            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                                <Box sx={{ textAlign: "center", fontWeight: "bold", textShadow: '0 0 6px rgba(255,255,255,0.4)' }}>
                                                    {element.name}
                                                </Box>
                                                <Avatar
                                                    alt={element.name ?? 'DefaultAvatar'}
                                                    onClick={() => handleClick(element, index)}
                                                    sx={{ width: 32, height: 32, cursor: 'pointer' }}
                                                />
                                            </Box>
                                            <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
                                                <TextField
                                                    label={'Heute'}
                                                    variant="outlined"
                                                    size="small"
                                                    value={prompts?.[index].previousDayPrompt.prompt || 'No prompt found...'}
                                                    InputProps={{ readOnly: true }}
                                                />
                                                <TextField
                                                    label={'Morgen'}
                                                    placeholder={isCurrentPrompter(userId, element) ? "Set the prompt for tomorrow" : "Its someone elses turn"}
                                                    variant="outlined"
                                                    size="small"
                                                    InputLabelProps={{ shrink: true }}
                                                    value={prompts?.[index].todayPrompt?.prompt ?? tomorrowPrompts[index] ?? ''}
                                                    InputProps={{
                                                        readOnly: !!prompts?.[index].todayPrompt?.prompt || !isCurrentPrompter(userId, element),
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {(tomorrowPrompts[index] || '').length > 0 ? (
                                                                    <Button
                                                                        size="small"
                                                                        variant="contained"
                                                                        sx={{
                                                                            backgroundColor: '#5A54D1',
                                                                            boxShadow: '0 4px 12px #6C64E1',
                                                                            color: '#ffffff',
                                                                        }}
                                                                        onClick={async () => {
                                                                            await handlePromptSave(element.groupId, tomorrowPrompts[index], index);
                                                                            setTomorrowPrompts((prev) => {
                                                                                const updated = [...prev];
                                                                                updated[index] = "";
                                                                                return updated;
                                                                            });
                                                                        }}
                                                                    >
                                                                        Okay
                                                                    </Button>
                                                                ) : (
                                                                    prompts?.[index].todayPrompt?.prompt ? (
                                                                        <CheckIcon fontSize={"small"} />
                                                                    ) : (
                                                                        isCurrentPrompter(userId, element) && <EditIcon fontSize={'small'} />
                                                                    )
                                                                )}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    onChange={(e) => {
                                                        const newPrompts = [...tomorrowPrompts];
                                                        newPrompts[index] = e.target.value;
                                                        setTomorrowPrompts(newPrompts);
                                                    }}
                                                />
                                            </Stack>
                                        </Box>
                                    </Grid>
                                ))}
                        </Grid>
                </Box>
            )}
        </>
    );
};

export default GroupChat;

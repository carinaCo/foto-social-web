// AddNewDrawer.tsx
import React, { useState } from "react";
import {
    Drawer, Box, Typography, IconButton,
    ButtonBase, Divider, TextField
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Checkbox, FormControlLabel } from '@mui/material';
import { Slide } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import {createGroup, getUserData} from "./helpers/groupHelper.tsx";
import toast from "react-hot-toast";
import { groupPageStyles as styles } from "./groupPageStyles.ts";
import {addFriend, getFriends} from "../FriendsPage/helpers/friendHelper.ts";
import type {UserDataResult} from "../Client/use_cases/UserManagement/GetUserData";
import CircularProgress from '@mui/material/CircularProgress';

interface AddNewDrawerProps {
    open: boolean;
    onClose: () => void;
}

const AddNewDrawer: React.FC<AddNewDrawerProps> = ({ open, onClose }) => {
    const [view, setView] = useState<'main' | 'groupAdd' | 'groupCreate' | 'contactAdd'>('main');
    const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
    const [wasInGroupAdd, setWasInGroupAdd] = useState<boolean>(false);
    const [wasInGroupAddCreate, setWasInGroupCreate] = useState<boolean>(false);
    const [wasInContactAdd, setWasInContactAdd] = useState<boolean>(false);
    const [groupName, setGroupName] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    // state for friends list
    const [friends, setFriends] = useState<UserDataResult[]>([]);
    const [isLoadingFriends, setIsLoadingFriends] = useState(false);

    const fetchFriends = async () => {
        setIsLoadingFriends(true);
        try {
            const activeUserId = '092ce280-8d97-45bc-a1a9-cedf9a95ff47'; // TODO: dynamisch holen
            const friendsResult = await getFriends(activeUserId);
            if (friendsResult?.success) {
                const userDataList = await Promise.all(
                    friendsResult.friends.map((id: string) => getUserData(id))
                );
                setFriends(userDataList);
            } else {
                setFriends([]);
            }
        } catch (_error) {
            setFriends([]);
            toast.error('Error fetching friends');
        } finally {
            setIsLoadingFriends(false);
        }
    };

    const handleClose = () => {
        setView('main'); // reset view on close
        setWasInGroupAdd(false); // auch resetten beim schliessen
        setWasInContactAdd(false);
        setWasInGroupCreate(false);
        setSelectedContacts([]);
        setGroupName('');
        // setFirstName('');
        // setLastName('');
        setUsername('');
        setUserId('');
        onClose();
    };

    const handleBackClick = () => {
        if (view === 'main') {
            handleClose();
        }
        else if (view === 'groupAdd') {
            setWasInGroupCreate(false);
            setSelectedContacts([]);
            setView('main');
        }
        else if (view === 'contactAdd') {
            // setFirstName('');
            // setLastName('');
            setUsername('');
            setUserId('');
            setView('main');
        }
        else {
            setView('groupAdd');
            setGroupName('');
        }
    }

    const handleToggleContact = (id: number) => {
        setSelectedContacts((prev) =>
            prev.includes(id)
                ? prev.filter((contactId) => contactId !== id)
                : [...prev, id]
        );
    };

    const handleCreateGroup = async () => {
        try {
            // TODO: for now hardcoded founder id für name: 'neuer user 1', should be fetched before
            // const founderId = '0a60fb39-d985-4543-8b3f-69aa79eb3839';
            const founderId = '092ce280-8d97-45bc-a1a9-cedf9a95ff47';
            const result = await createGroup(founderId, groupName);
            if (result?.success) {
                toast.success('Gruppe wurde erstellt!');
            } else {
                toast.error('Erstellen fehlgeschlagen');
            }
        }
        catch (error) {
            toast.error('Ein unerwarteter Fehler ist aufgetreten.');
            console.error('Ein unerwarteter Fehler ist aufgetreten.', error);
        }
    }

    const handleAddContact = async () => {
        try {
            // const activeUserId = '0a60fb39-d985-4543-8b3f-69aa79eb3839'; // TODO: get active user id
            const activeUserId = '092ce280-8d97-45bc-a1a9-cedf9a95ff47'; // TODO: get active user id
            const result = await addFriend(activeUserId, userId);
            if (result?.success) {
                toast.success('Der Bre wurde geadded!');
            } else {
                toast.error('Hinzufügen fehlgeschlagen');
            }
        } catch (error) {
            toast.error('Ein unerwarteter Fehler ist aufgetreten.');
            console.error('Ein unerwarteter Fehler ist aufgetreten.', error);
        }
    };

    const isEmptyStringOrOnlySpaces = (passedString: string) => {
        return passedString.trim() === ''
    }

    const isContactAddFormInvalid = [
        userId
    ].some(isEmptyStringOrOnlySpaces);

    React.useEffect(() => {
        if (view === 'groupAdd') {
            void fetchFriends();
        }
    }, [view]);

    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={handleClose}
            slotProps={{
                paper: {
                    sx: styles.drawerPaper
                }
            }}
        >
            <Box sx={{ position: 'relative', height: '100%' }}>
                <IconButton
                    onClick={() => {handleBackClick()}}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        color: '#fff'
                    }}
                >
                    {view === 'main' ? <CloseIcon /> : <ArrowBackIcon />}
                </IconButton>
                {view === 'groupAdd' && (
                    <ButtonBase
                        onClick={() => {
                            console.log("Selected IDs:", selectedContacts);
                            setWasInGroupCreate(true);
                            setView('groupCreate');
                        }}
                        disabled={selectedContacts.length === 0}
                        sx={{
                            ...styles.continueButton,
                            color: selectedContacts.length === 0
                                ? 'rgba(255, 255, 255, 0.4)'
                                : '#ffffff',
                            textTransform: 'none',
                            '&:hover': {
                                color: selectedContacts.length === 0
                                    ? 'rgba(255, 255, 255, 0.4)'
                                    : '#dbeafe'
                            }
                        }}
                    >
                        <Typography variant="body1" component={'span'}>
                            Continue
                        </Typography>
                        <ArrowForwardIcon />
                    </ButtonBase>
                )}

                {view === 'main' && (
                    <Slide direction={wasInGroupAdd || wasInContactAdd ? 'right' : 'down'} in={view === 'main'} appear={wasInGroupAdd || wasInContactAdd} mountOnEnter unmountOnExit>
                    <Box sx={{ pt: 8 }}>
                        <Typography variant="h5" align="center">New Groups</Typography>
                        <Typography variant="body1" align="center" sx={{ pt: 3 }}>
                            Create a new group or add new contacts!
                        </Typography>

                        <Box sx={{ pt: 4 }}>
                            <ButtonBase
                                onClick={() =>
                                {
                                    setWasInGroupAdd(true);
                                    setView('groupAdd');
                                }}
                                sx={styles.newGroupButton}
                            >
                                <GroupAddIcon fontSize="large" />
                                <Typography variant="h6" sx={{ ml: 5 }}>
                                    New Group
                                </Typography>
                            </ButtonBase>

                            <Divider sx={{ my: 2 }} />

                            <ButtonBase
                                onClick={() =>{
                                    setWasInContactAdd(true);
                                    setView('contactAdd')
                                }}
                                sx={styles.newContactButton}
                            >
                                <PersonAddIcon fontSize="large" />
                                <Typography variant="h6" sx={{ ml: 5 }}>
                                    New Contact
                                </Typography>
                            </ButtonBase>
                        </Box>
                    </Box>
                    </Slide>
                )}

                {view === 'groupAdd' && (
                    <Slide direction={wasInGroupAddCreate ? 'right' : 'left'} in={view === 'groupAdd'} mountOnEnter unmountOnExit>
                        <Box sx={{ pt: 8 }}>
                            <Typography variant="h5" align="center">Members</Typography>
                            <Typography variant="body1" align="center" sx={{ pt: 3, pb: 4 }}>
                                Select group members!
                            </Typography>
                            <Box sx={{ maxHeight: '71vh', overflowY: 'auto', mr: -1 }}>
                                {isLoadingFriends ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                        <CircularProgress />
                                    </Box>
                                ) : (
                                    friends.length === 0 ? (
                                        <Typography align="center" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                            No friends found.<br />Add some friends first!
                                        </Typography>
                                    ) : (
                                        friends.map((contact, idx) => (
                                            <FormControlLabel
                                                key={contact.userId || idx}
                                                control={
                                                    <Checkbox
                                                        checked={selectedContacts.includes(idx)}
                                                        onChange={() => handleToggleContact(idx)}
                                                        icon={<RadioButtonUncheckedIcon sx={{ color: 'rgba(255,255,255,0.4)' }} />}
                                                        checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#5A54D1', filter: 'drop-shadow(0 0 4px rgba(108, 100, 225, 0.4))' }} />}
                                                        sx={{ color: 'white', py: 2 }}
                                                    />
                                                }
                                                label={contact.username}
                                                sx={{
                                                    display: 'block',
                                                    mx: 2,
                                                    color: 'white',
                                                    borderRadius: 1,
                                                    '&:hover': { backgroundColor: 'action.hover' },
                                                }}
                                            />
                                        ))
                                    )
                                )}
                            </Box>
                        </Box>
                    </Slide>
                )}

                {view === 'groupCreate' && (
                    <Slide direction="left" in={view === 'groupCreate'} mountOnEnter unmountOnExit>
                    <Box sx={{ pt: 8 }}>
                        <Typography variant="h5" align="center">New Group</Typography>
                        <Box sx={{ px: 2, pb: 2, pt: 2 }}>
                            <TextField
                                autoFocus
                                variant="outlined"
                                fullWidth
                                placeholder="Group name"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                InputProps={{
                                    sx: {
                                        bgcolor: 'rgba(255, 255, 255, 0.04)',
                                        borderRadius: 2,
                                        color: 'white',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#5A54D1',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#5A54D1',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#5A54D1',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#5A54D1', // fokus border
                                        },
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        borderColor: 'rgba(108, 100, 225, 0.4)'
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{ mt: 4, px: 2 }}>
                            {selectedContacts.slice(0,6).map((index) => {
                                    const contact = friends[index];
                                    if (!contact) return null;

                                    return (
                                        <Box
                                            key={contact.userId || index}
                                            sx={styles.contactSummary}
                                        >
                                            <Box
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: '50%',
                                                    bgcolor: '#6C64E1',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {contact.username ? contact.username[0] : '?'}
                                            </Box>
                                            <Typography>
                                                {contact.username}
                                            </Typography>
                                        </Box>
                                    );
                                })
                            }
                            {selectedContacts.length > 6 && (
                                <Typography
                                    sx={{
                                        mt: 1,
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        fontStyle: 'italic',
                                        textAlign: 'center',
                                    }}
                                >
                                    + {selectedContacts.length - 6} more
                                </Typography>
                            )}
                            <ButtonBase
                                onClick={ async () => {
                                    console.log("Gruppe erstellt mit: " + selectedContacts + " und Name: ", groupName);
                                    handleClose();
                                    await handleCreateGroup();
                                }}
                                disabled={isEmptyStringOrOnlySpaces(groupName)}
                                sx={{...styles.addGroupButton,
                                    bgcolor: isEmptyStringOrOnlySpaces(groupName)
                                        ? 'rgba(255, 255, 255, 0.05)'
                                        : '#5A54D1', // glassy violet
                                    color: isEmptyStringOrOnlySpaces(groupName)
                                        ? 'rgba(255, 255, 255, 0.4)'
                                        : '#ffffff',
                                    boxShadow: isEmptyStringOrOnlySpaces(groupName)
                                        ? 'none'
                                        : '0 4px 12px #6C64E1',
                                    '&:hover': {
                                        bgcolor: isEmptyStringOrOnlySpaces(groupName)
                                            ? 'rgba(255, 255, 255, 0.05)'
                                            : '#6C64E1',
                                    },
                                }}
                            >
                                Create Group
                            </ButtonBase>
                        </Box>
                    </Box>
                    </Slide>
                )}
                {view === 'contactAdd' && (
                    <Slide direction={'left'} in={view === 'contactAdd'} mountOnEnter unmountOnExit>
                        <Box sx={{ pt: 8 }}>
                            <Typography variant="h5" align="center">New Contact</Typography>
                            <Box sx={{ px: 2, pb: 2, pt: 4 }}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    placeholder="User id"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    InputProps={{
                                        sx: {
                                            bgcolor: 'rgba(255, 255, 255, 0.04)',
                                            borderRadius: 2,
                                            color: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'rgba(255, 255, 255, 0.1)',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#3B82F6',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#3B82F6',
                                            },
                                        },
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: 'rgba(255, 255, 255, 0.6)',
                                        },
                                    }}
                                />
                            </Box>
                            <ButtonBase
                                onClick={ async () => {
                                    console.log("Added " + username + ' with the userId ' + userId + ' to your contacts!');
                                    await handleAddContact();
                                    handleClose();
                                }}
                                disabled={isContactAddFormInvalid}
                                sx={{...styles.addGroupButton,
                                    bgcolor: isContactAddFormInvalid
                                        ? 'rgba(255, 255, 255, 0.05)'
                                        : '#5A54D1', // Glassy violet
                                    color: isContactAddFormInvalid
                                        ? 'rgba(255, 255, 255, 0.4)'
                                        : '#ffffff',
                                    boxShadow: isContactAddFormInvalid
                                        ? 'none'
                                        : '0 4px 12px #6C64E1',
                                    '&:hover': {
                                        bgcolor: isContactAddFormInvalid
                                            ? 'rgba(255, 255, 255, 0.05)'
                                            : '#6C64E1',
                                    },
                                }}
                            >
                                Add Contact
                            </ButtonBase>
                        </Box>
                    </Slide>
                )}
            </Box>
        </Drawer>
    );
};

export default AddNewDrawer;

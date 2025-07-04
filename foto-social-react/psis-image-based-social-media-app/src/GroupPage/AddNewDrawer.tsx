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
import {createGroup} from "./helpers/groupHelper.tsx";
import toast from "react-hot-toast";

const styles = {
    drawerPaper: {
        height: '95vh',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        bgcolor: 'rgba(110, 80, 150, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        color: '#fff',
        px: 3,
        py: 2
    },
    continueButton: {
        position: 'absolute',
        top: 12,
        right: 8,
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1,
        py: 0.5,
        borderRadius: 1,
        fontWeight: 500,
        fontSize: '0.95rem'
    },
    newGroupButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        px: 2,
        py: 1.5,
        borderRadius: 1,
        '&:hover': {
            backgroundColor: 'action.hover',
        }
    },
    newContactButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        px: 2,
        py: 1.5,
        borderRadius: 1,
        '&:hover': {
            backgroundColor: 'action.hover',
        }
    },
    contactSummary: {
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        py: 1,
        px: 2,
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        mb: 1,
    },
    addGroupButton: {
        mt: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 'auto',
        px: 4,
        py: 1.6,
        borderRadius: '12px',
        fontSize: '1rem',
        textTransform: 'none',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        transition: 'all 0.2s ease-in-out',
    }
};

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
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [userId, setUserId] = useState<string>('');


    const handleClose = () => {
        setView('main'); // reset view on close
        setWasInGroupAdd(false); // auch resetten beim schliessen
        setWasInContactAdd(false);
        setWasInGroupCreate(false);
        setSelectedContacts([]);
        setGroupName('');
        setFirstName('');
        setLastName('');
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
            setFirstName('');
            setLastName('');
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
            const founderId = '0a60fb39-d985-4543-8b3f-69aa79eb3839';
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

    const isEmptyStringOrOnlySpaces = (passedString: string) => {
        return passedString.trim() === ''
    }

    const isContactAddFormInvalid = [
        firstName,
        lastName,
        userId
    ].some(isEmptyStringOrOnlySpaces);

    const hardCodedContacts = [
        { id: 1, firstName: 'Peter', lastName: 'Mayer' },
        { id: 2, firstName: 'Anna', lastName: 'Ulrich' },
        { id: 3, firstName: 'Mister', lastName: 'Bro' },
        { id: 4, firstName: 'Frederik', lastName: 'Frikadelle' },
        { id: 5, firstName: 'So-ein', lastName: 'Dude' },
        { id: 6, firstName: 'Bruno', lastName: 'Bananenbrot' },
        { id: 7, firstName: 'Lotta', lastName: 'Lachsfilet' },
        { id: 8, firstName: 'Horst', lastName: 'Hüpfburg' },
        { id: 9, firstName: 'Gisela', lastName: 'Glitzerstaub' },
        { id: 10, firstName: 'Kevin', lastName: 'Kaktus' },
        { id: 11, firstName: 'Chantal', lastName: 'Champignon' },
        { id: 12, firstName: 'Uwe', lastName: 'Unwetter' },
        { id: 13, firstName: 'Susi', lastName: 'Sonnenbrand' },
        { id: 14, firstName: 'Heinz', lastName: 'Hörnchen' },
        { id: 15, firstName: 'Berta', lastName: 'Besenstiel' },
    ];


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

                        <Box
                            sx={{
                                maxHeight: '71vh',
                                overflowY: 'auto',
                                mr: -1, // optional: negiert Scrollbar-Breite
                            }}
                        >
                        {hardCodedContacts.map((contact) => (
                            <FormControlLabel
                                key={contact.id}
                                control={
                                        <Checkbox
                                            checked={selectedContacts.includes(contact.id)}
                                            onChange={() => handleToggleContact(contact.id)}
                                            icon={<RadioButtonUncheckedIcon sx={{ color: 'rgba(255,255,255,0.4)' }} />}
                                            checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#5A54D1', filter: 'drop-shadow(0 0 4px rgba(108, 100, 225, 0.4))' }} />}
                                            sx={{ color: 'white', py: 2 }}
                                        />
                                }
                                label={`${contact.firstName} ${contact.lastName}`}
                                sx={{
                                    display: 'block',
                                    mx: 2,
                                    color: 'white',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    },
                                }}
                            />
                        ))}
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
                            {selectedContacts.slice(0,6).map((id) => {
                                    const contact = hardCodedContacts.find(c => c.id === id);
                                    if (!contact) return null;

                                    return (
                                        <Box
                                            key={contact.id}
                                            sx={styles.contactSummary}
                                        >
                                            <Box
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: '50%',
                                                    bgcolor: '#3B82F6',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {contact.firstName[0]}
                                            </Box>
                                            <Typography>
                                                {contact.firstName} {contact.lastName}
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
                            <Box sx={{ px: 2, pb: 1, pt: 4 }}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    placeholder="First name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
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
                            <Box sx={{ px: 2, pb: 2, pt: 0 }}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
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
                                onClick={() => {
                                    console.log("Added " + firstName + ' ' + lastName + ' with the userId ' + userId + ' to your contacts!');
                                    handleClose();
                                    // hier dann iwi einen contactCreatedHandler({ name: groupName, members: selectedContacts });
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

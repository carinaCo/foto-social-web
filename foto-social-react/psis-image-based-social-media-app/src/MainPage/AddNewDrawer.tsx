// AddNewDrawer.tsx
import React, { useState } from "react";
import {
    Drawer, Box, Typography, IconButton,
    ButtonBase, Divider
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Checkbox, FormControlLabel } from '@mui/material';
import { Slide } from "@mui/material";


interface AddNewDrawerProps {
    open: boolean;
    onClose: () => void;
}

const AddNewDrawer: React.FC<AddNewDrawerProps> = ({ open, onClose }) => {
    const [view, setView] = useState<'main' | 'groupAdd'>('main');
    const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
    const [wasInGroupAdd, setWasInGroupAdd] = useState(false);

    const handleClose = () => {
        setView('main'); // reset view on close
        setWasInGroupAdd(false); // auch resetten beim schliessen
        onClose();
    };

    const handleToggleContact = (id: number) => {
        setSelectedContacts((prev) =>
            prev.includes(id)
                ? prev.filter((contactId) => contactId !== id)
                : [...prev, id]
        );
    };

    const hardCodedContacts =
        [
            {id: 1, firstName: 'Peter', lastName: 'Mayer' },
            {id: 2, firstName: 'Anna', lastName: 'Ulrich' },
            {id: 3, firstName: 'Mister', lastName: 'Bro' },
            {id: 4, firstName: 'Frederik', lastName: 'Frikadelle' },
            {id: 5, firstName: 'So-ein', lastName: 'Dude' },
        ];

    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={handleClose}
            slotProps={{
                paper: {
                    sx: {
                        height: '95vh',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        bgcolor: 'rgba(28, 28, 28, 0)',
                        backdropFilter: 'blur(12px)',
                        color: '#fff',
                        px: 3,
                        py: 2,
                    }
                }
            }}
        >
            <Box sx={{ position: 'relative', height: '100%' }}>
                <IconButton
                    onClick={view === 'main' ? handleClose : () => setView('main')}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        color: '#fff'
                    }}
                >
                    {view === 'main' ? <CloseIcon /> : <ArrowBackIcon />}
                </IconButton>

                {view === 'main' && (
                    <Slide direction="right" in={view === 'main'} appear={wasInGroupAdd} mountOnEnter unmountOnExit>
                    <Box sx={{ pt: 6 }}>
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
                                sx={{
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
                                }}
                            >
                                <GroupAddIcon fontSize="large" />
                                <Typography variant="h6" sx={{ ml: 5 }}>
                                    New Group
                                </Typography>
                            </ButtonBase>

                            <Divider sx={{ my: 2 }} />

                            <ButtonBase
                                onClick={() => { console.log('Add contact') }}
                                sx={{
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
                                }}
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
                    <Slide direction="left" in={view === 'groupAdd'} mountOnEnter unmountOnExit>
                    <Box sx={{ pt: 6 }}>
                        <Typography variant="h5" align="center">Members</Typography>
                        <Typography variant="body1" align="center" sx={{ pt: 3, pb: 4 }}>
                            Select group members!
                        </Typography>

                        {hardCodedContacts.map((contact) => (
                            <FormControlLabel
                                key={contact.id}
                                control={
                                    <Checkbox
                                        checked={selectedContacts.includes(contact.id)}
                                        onChange={() => handleToggleContact(contact.id)}
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
                        <ButtonBase
                            onClick={() => console.log("Selected IDs:", selectedContacts)}
                            sx={{
                                mt: 3,
                                display: 'block',
                                mx: 'auto',
                                px: 3,
                                py: 1.5,
                                borderRadius: 2,
                                bgcolor: 'primary.main',
                                color: '#fff',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                }
                            }}
                        >
                            Create Group
                        </ButtonBase>
                    </Box>
                    </Slide>
                )}
            </Box>
        </Drawer>
    );
};

export default AddNewDrawer;

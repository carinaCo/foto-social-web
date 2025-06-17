import React from 'react';
import {
    Drawer,
    Box,
    Typography,
    ButtonBase,
    Divider, IconButton, Slide, Fade
} from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface GroupAddProps {
    open: boolean;
    onClose: () => void;
    onAddGroup: () => void;
    onAddContact?: () => void;
}

const GroupAddDrawer: React.FC<GroupAddProps> = ({ open, onClose, onAddGroup }) => {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: {
                        width: '100vw',
                        height: '95vh',
                        position: 'fixed',
                        bottom: 0,
                        top: 'auto',
                        zIndex: 1400,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        bgcolor: 'rgba(28, 28, 28, 0)',
                        backdropFilter: 'blur(12px)',
                        color: '#fff'
                    },
                },
            }}>

            <Box sx={{ width: 300, p: 3 }}>
                {/*<ButtonBase>*/}
                {/*    <Typography*/}
                {/*        variant="h6"*/}
                {/*        align="center"*/}
                {/*        sx={{ mb: 2 }}*/}
                {/*    >*/}
                {/*        Cancel*/}
                {/*    </Typography>*/}
                {/*</ButtonBase>*/}
                <IconButton onClick={onClose}>
                    <ArrowBackIcon />
                </IconButton>
                <ButtonBase
                    onClick={onAddGroup}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: '100%',
                        py: 1.5,
                        px: 2,
                        borderRadius: 1,
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        },
                    }}
                >
                    <GroupAddIcon fontSize="large" />
                    <Typography variant="h6" sx={{ ml: 2 }}>
                        New Group
                    </Typography>
                </ButtonBase>
                <Divider sx={{ my: 2 }} />
            </Box>
        </Drawer>

    );
};

export default GroupAddDrawer;

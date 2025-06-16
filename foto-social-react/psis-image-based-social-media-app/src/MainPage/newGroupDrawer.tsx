// BottomDrawer.tsx
import React from "react";
import {Drawer, Box, Typography, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


interface NewGroupDrawerProps {
    open: boolean;
    onClose: () => void;
}

const NewGroupDrawer: React.FC<NewGroupDrawerProps> = ({ open, onClose }) => {
    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
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
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: '#fff'
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ pt: 6 }}>
                    <Typography variant="h6">Gruppen Add Menü</Typography>
                    <Typography variant="body2">
                        Untermenüs für Gruppen usw.
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    );
};

export default NewGroupDrawer;

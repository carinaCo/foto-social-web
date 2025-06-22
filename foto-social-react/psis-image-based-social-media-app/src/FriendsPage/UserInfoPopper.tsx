import React from 'react';
import {Typography, Popover} from '@mui/material';

interface UserInfoPopperProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    userId: string;
    onClose: () => void;
}

const UserInfoPopover: React.FC<UserInfoPopperProps> = ({ open, anchorEl, userId, onClose }) => {
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            PaperProps={{
                sx: {
                    backdropFilter: 'blur(12px) saturate(180%)',
                    backgroundColor: 'rgba(30, 30, 40, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 2,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                    color: 'rgba(255, 255, 255, 0.9)'
                },
            }}
        >
            <Typography sx={{ p: 2,  }}>User ID: {userId}</Typography>
        </Popover>
    );
};

export default UserInfoPopover;

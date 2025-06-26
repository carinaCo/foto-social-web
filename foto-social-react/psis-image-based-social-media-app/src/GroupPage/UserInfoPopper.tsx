import React, {useState} from 'react';
import {Typography, Popover, Tooltip, Box} from '@mui/material';

interface UserInfoPopperProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    userId: string;
    onClose: () => void;
    onCopy: () => void;
}

const UserInfoPopover: React.FC<UserInfoPopperProps> = ({ open, anchorEl, userId, onClose, onCopy }) => {
    const [showFill, setShowFill] = useState(false);

    const handleClick = () => {
        onCopy();
        setShowFill(true);
        setTimeout(() => setShowFill(false), 1500); // animation verschwindet nach 1.5s
    };

    return (
        <>
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
                <Tooltip title="Click to copy ID" placement="top">
                    <Box onClick={handleClick} sx={{ p: 2, position: 'relative' }}>
                        {showFill && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    height: '100%',
                                    width: '100%',
                                    background: 'linear-gradient(to right, rgba(76, 175, 80, 0.3), transparent)',
                                    animation: 'fillAnimation 1.6s linear',
                                    zIndex: 0,
                                }}
                            />
                        )}
                        <Typography sx={{ position: 'relative', zIndex: 1 }}>
                            User ID: {userId}
                        </Typography>
                    </Box>
                </Tooltip>

                <style>
                    {`
                    @keyframes fillAnimation {
                        0% { width: 0%; }
                        100% { width: 100%; }
                    }
                `}
                </style>
            </Popover>
        </>
    );
};

export default UserInfoPopover;

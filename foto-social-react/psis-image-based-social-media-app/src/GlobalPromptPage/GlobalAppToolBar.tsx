import React, { useState } from 'react';
import {
    Avatar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Dialog,
    DialogTitle,
    Icon,
    DialogContent,
    DialogActions,
    Button, Stack, Fade, AppBar, Snackbar, Alert
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CameraCapture from './CameraCapture';
import { chatPageStyles } from "../ChatPage/chatPageStyles.ts";
import KeyIcon from '@mui/icons-material/Key';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAuth } from "../context/AuthContext.tsx";
import { sendGroupPost } from "../ChatPage/helpers/chatHelper.tsx";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import UserInfoPopover from "../GroupPage/UserInfoPopper.tsx";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyOffIcon from "@mui/icons-material/KeyOff";

const globalGroupId = 'a058d8c8-9b5d-4ac7-b630-cbb0378b3368';

interface GlobalAppToolBarProps {
    prompt: string;
    onPostSent?: () => void;
}

const GlobalAppToolBar: React.FC<GlobalAppToolBarProps> = ({ prompt, onPostSent }) => {
    const { userId } = useAuth();

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [lockOpen, setLockOpen] = useState(false);
    const [unlocking, setUnlocking] = useState(false);
    const [uploadMode, setUploadMode] = useState(false);
    const [rotating, setRotating] = useState(false);
    // user info states
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [copiedId, setCopiedId] = React.useState<string | null>(null);

    const handlePhotoCaptured = (imageData: string) => {
        setPreview(imageData);
        setDialogOpen(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
            setDialogOpen(true);
        };
        reader.readAsDataURL(file);
    };

    const handleShowActions = () => {
        setRotating(true);
        setTimeout(() => {
            setRotating(false);
            setUploadMode(true);
        }, 100);
    };

    const handleSend = async () => {
        if (!preview || !userId) return;
        setUnlocking(true);
        setTimeout(() => setLockOpen(true), 600);
        const base64 = preview.split(',')[1];
        await sendGroupPost(userId, globalGroupId, base64);
        setDialogOpen(false);
        setPreview(null);
        setUnlocking(false);
        setLockOpen(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (onPostSent) onPostSent();
    };

    const handleDialogCancel = () => {
        setDialogOpen(false);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleUserInfoClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleSnackbarClick = (userId: string) => {
        navigator.clipboard.writeText(userId).then(() => {
            setCopiedId(userId);
            setSnackbarOpen(true);
            handleUserInfoClose();
        });
    };
    const handleUserInfoClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar>
            <Toolbar
                sx={{
                    position: 'fixed',
                    top: 10,
                    right: 0,
                    height: 64,
                    zIndex: 1100,
                    borderRadius: '24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '95%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    justifyContent: uploadMode ? 'center' : 'space-between'
                }}
            >
                {!uploadMode ? (
                    <>
                        <IconButton
                            size="large"
                            aria-label="account-icon"
                            color="inherit"
                            onClick={handleUserInfoClick}
                            sx={{
                                borderRadius: '50%',
                                p: 0.5,
                                '&:hover': { background: 'rgba(255,255,255,0.15)' }
                            }}
                        >
                            <Avatar sx={{ bgcolor: '#6C63FF' }} />
                        </IconButton>
                        <Box sx={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Typography variant="h6" sx={{
                                color: 'rgba(255,255,255,0.95)',
                                fontWeight: 600,
                                textShadow: '0 0 6px rgba(255,255,255,0.4)'
                            }}>
                                Global
                            </Typography>
                            <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>
                                {prompt}
                            </Typography>
                        </Box>
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={handleShowActions}
                        >
                            <KeyIcon
                                sx={{
                                    fontSize: 32,
                                    transform: rotating ? 'rotate(360deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease'
                                }}
                            />
                        </IconButton>
                    </>
                ) : (
                    <Fade in={uploadMode} timeout={300}>
                    <Stack direction="row" spacing={3} alignItems="center">
                        <IconButton
                            sx={chatPageStyles.cameraInputButton}
                            onClick={() => setCameraOpen(true)}
                        >
                            <CameraAltIcon sx={{ fontSize: 28 }} />
                        </IconButton>
                        <IconButton onClick={() => fileInputRef.current?.click()} sx={chatPageStyles.libraryInputButton}>
                            <PhotoLibraryIcon sx={{ fontSize: 28 }} />
                        </IconButton>
                        <IconButton onClick={() => setUploadMode(false)} sx={chatPageStyles.cancelIconButton}>
                            <CancelIcon sx={{ fontSize: 28 }} />
                        </IconButton>
                    </Stack>
                    </Fade>
                )}
            </Toolbar>
            </AppBar>

            <CameraCapture
                open={cameraOpen}
                onClose={() => setCameraOpen(false)}
                onCapture={handlePhotoCaptured}
            />

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <Dialog open={dialogOpen} onClose={handleDialogCancel} slotProps={{ paper: { sx: chatPageStyles.dialogPaper } }}>
                <DialogTitle sx={{ color: '#ffffff', fontSize: '1.2rem', textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon sx={{ ...chatPageStyles.lockIcon, transform: unlocking ? 'rotate(360deg) scale(1.3)' : 'none' }}>
                            {lockOpen ? <LockOpenIcon /> : <LockIcon />}
                        </Icon>
                    </Box>
                </DialogTitle>
                <DialogContent sx={chatPageStyles.dialogContent}>
                    {preview && <img src={preview} alt="Preview" style={chatPageStyles.previewImage} />}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button onClick={handleDialogCancel}
                            variant="contained"
                            endIcon={
                        <Icon sx={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}>
                            <KeyOffIcon />
                        </Icon>
                    }
                            sx={chatPageStyles.dialogActionsCancelButton}>
                        Abbrechen
                    </Button>
                    <Button onClick={handleSend}
                            variant="contained"
                            sx={chatPageStyles.dialogActionsSendButton}
                            endIcon={
                                <Icon sx={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}>
                                    <KeyIcon />
                                </Icon>
                            }
                    >
                        Senden
                    </Button>
                </DialogActions>
            </Dialog>

            <UserInfoPopover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                userId={userId}
                onClose={handleUserInfoClose}
                onCopy={() => handleSnackbarClick(userId)}
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={1500}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="success"
                    icon={<CheckCircleIcon />}
                    sx={{
                        backdropFilter: 'blur(12px) saturate(180%)',
                        backgroundColor: 'rgba(180, 100, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 2,
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 500,
                    }}
                    onClose={() => setSnackbarOpen(false)}
                >
                    ID {copiedId} copied to clipboard!
                </Alert>
            </Snackbar>
        </>
    );
};

export default GlobalAppToolBar;

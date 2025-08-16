import React, { useState, useRef } from 'react';
import {
    Paper,
    Box,
    Stack,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, IconButton, Icon, Fade
} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CancelIcon from '@mui/icons-material/Cancel';
import { sendGroupPost } from "./helpers/chatHelper.tsx";
import { useParams } from "react-router-dom";
import { hasUserPostedInGroupToday } from "../GroupPage/helpers/groupHelper";
import { useAuth } from "../context/AuthContext.tsx";
import CameraCapture from "../GlobalPromptPage/CameraCapture.tsx";
import toast from "react-hot-toast";
import {chatPageStyles} from "./chatPageStyles.ts";

interface BottomBeforeUploadProps {
    onPostSent?: () => void;
}

const BottomBeforeUpload: React.FC<BottomBeforeUploadProps> = ({ onPostSent }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    const { id: groupId } = useParams<{ id: string }>();
    const { userId } = useAuth();

    const [showActions, setShowActions] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [lockOpen, setLockOpen] = useState(false);
    const [unlocking, setUnlocking] = useState(false);
    const [rotating, setRotating] = useState(false);
    const [hasPostedToday, setHasPostedToday] = useState<boolean>(false);
    const [cameraOpen, setCameraOpen] = useState(false);

    React.useEffect(() => {
        const checkHasPosted = async () => {
            if (groupId && userId) {
                try {
                    const hasUserPosted = await hasUserPostedInGroupToday(userId, groupId);
                    setHasPostedToday(hasUserPosted ?? false);
                } catch (error) {
                    console.error('hasUserPosted error: ', error);
                    setHasPostedToday(false);
                }
            }
        };
        void checkHasPosted();
    }, [groupId, userId]);

    const handleShowActions = () => {
        setRotating(true);
        setTimeout(() => {
            setRotating(false);
            setShowActions(true);
        }, 100);
    };

    const handleCancelActions = () => {
        setShowActions(false);
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

    const handlePhotoCaptured = (imageData: string) => {
        setPreview(imageData);
        setDialogOpen(true);
    };

    const handleSend = async () => {
        if (!preview || !groupId) {
            toast.error('Bruhhhh... da ist was schiefgelaufen.');
            return;
        }
        setUnlocking(true);
        setTimeout(() => {
            setLockOpen(true);
        }, 600);

        const base64 = preview.split(',')[1];
        await sendGroupPost(userId, groupId, base64);

        if (onPostSent) onPostSent();

        try {
            const hasUserPosted = await hasUserPostedInGroupToday(userId, groupId);
            setHasPostedToday(hasUserPosted ?? false);
        } catch (error) {
            setHasPostedToday(false);
        }

        setDialogOpen(false);
        setPreview(null);
        setShowActions(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (cameraInputRef.current) cameraInputRef.current.value = "";
        setUnlocking(false);
        setLockOpen(false);
    };

    const handleDialogCancel = () => {
        setDialogOpen(false);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (cameraInputRef.current) cameraInputRef.current.value = "";
    };

    return (
        <>
            {/* Bottom Glassy Bar */}
            <Paper
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: showActions ? '90%' : '64px',
                    height: 64,
                    borderRadius: '24px',
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1200,
                    transition: 'all 0.3s ease-in-out'
                }}
                elevation={0}
            >
                <Stack direction="row" spacing={3} alignItems="center">
                    {/* Zeige Key nur, wenn keine Actions */}
                    {!showActions && (
                        <IconButton
                            onClick={handleShowActions}
                            disabled={hasPostedToday}
                            sx={{ ...chatPageStyles.notExpandedIconButton, transition: 'transform 0.3s ease' }}
                        >
                            <KeyIcon
                                sx={{
                                    fontSize: 32,
                                    transform: rotating ? 'rotate(360deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease'
                                }}
                            />
                        </IconButton>
                    )}

                    {/* Zeige Actions nur, wenn showActions true */}
                    {showActions && (
                        <Fade in={showActions} timeout={300}>
                            <Stack direction="row" spacing={3} alignItems="center">
                                <IconButton onClick={() => setCameraOpen(true)} sx={chatPageStyles.cameraInputButton}>
                                    <CameraAltIcon sx={{ fontSize: 28 }} />
                                </IconButton>
                                <CameraCapture
                                    open={cameraOpen}
                                    onClose={() => setCameraOpen(false)}
                                    onCapture={handlePhotoCaptured}
                                />
                                <IconButton onClick={handleCancelActions} sx={chatPageStyles.cancelIconButton}>
                                    <CancelIcon sx={{ fontSize: 28 }} />
                                </IconButton>
                                <IconButton onClick={() => fileInputRef.current?.click()} sx={chatPageStyles.libraryInputButton}>
                                    <PhotoLibraryIcon sx={{ fontSize: 28 }} />
                                </IconButton>
                                <input
                                    ref={cameraInputRef}
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </Stack>
                        </Fade>
                    )}
                </Stack>
            </Paper>

            {/* Preview Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={handleDialogCancel}
                slotProps={{
                        paper: {
                            sx: chatPageStyles.dialogPaper
                        }
                    }}
            >
                <DialogTitle
                    sx={{
                        color: '#ffffff',
                        fontSize: '1.2rem',
                        textAlign: 'center'
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon
                            sx={{
                                transform: unlocking ? 'rotate(360deg) scale(1.3)' : 'none',
                                transition: 'transform 0.3s ease'
                            }}
                        >
                            {lockOpen ? <LockOpenIcon /> : <LockIcon />}
                        </Icon>
                    </Box>
                </DialogTitle>
                <DialogContent
                    sx={chatPageStyles.dialogContent}
                >
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            style={chatPageStyles.previewImage}
                        />
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button
                        onClick={handleDialogCancel}
                        endIcon={
                            <Icon sx={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}>
                                <KeyOffIcon />
                            </Icon>
                        }
                        variant="contained"
                        sx={chatPageStyles.dialogActionsCancelButton}
                    >
                        Abbrechen
                    </Button>
                    <Button
                        onClick={handleSend}
                        endIcon={
                            <Icon sx={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}>
                                <KeyIcon />
                            </Icon>
                        }
                        variant="contained"
                        sx={chatPageStyles.dialogActionsSendButton}
                    >
                        Senden
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default BottomBeforeUpload;

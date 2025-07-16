import React, { useState, useRef } from 'react';
import {
    Paper,
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Stack,
    Dialog, DialogTitle, DialogContent,
    DialogActions, Button, IconButton, Icon,
} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CancelIcon from '@mui/icons-material/Cancel';
import {sendGroupPost} from "./helpers/chatHelper.tsx";
import {useParams} from "react-router-dom";





const BottomBeforeUpload: React.FC = () => {
  
    const [expanded, setExpanded] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { id: groupId } = useParams<{ id: string; }>();
    const [lockOpen, setLockOpen] = useState(false);
    // animation shit, unnötig lol aber cool
    const [unlocking, setUnlocking] = useState(false);
    const [rotating, setRotating] = useState(false);

    const handleToggleExpandWithAnimation = () => {
        setRotating(true);
        setTimeout(() => {
            setRotating(false);
            setExpanded(true);
        }, 100); // Dauer der Animation
    };

    const handleCancel = () => {
      setExpanded(false);
    };

    // Datei auswählen und Preview anzeigen
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
            setDialogOpen(true);
        };
        reader.readAsDataURL(file);
    };

    // Senden bestätigen
    const handleSend = async () => {
        // early return falls groupId oder preview oder selectedFile nicht gesetzt sind
        if (!selectedFile || !preview || !groupId) return;
        console.log('in handle send: ');
        // setLockOpen(true);
        setUnlocking(true);

        setTimeout(() => {
            setLockOpen(true);
        }, 600);
        const userId = '092ce280-8d97-45bc-a1a9-cedf9a95ff47'; // TODO: nicht mehr hardcoden
        // Base64 extrahieren (ohne Data-URL-Präfix)
        const base64 = preview.split(',')[1];
        await sendGroupPost(userId, groupId, base64);
        setDialogOpen(false);
        setPreview(null);
        setSelectedFile(null);
        setExpanded(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (cameraInputRef.current) cameraInputRef.current.value = "";
        setUnlocking(false);
        setLockOpen(false);
    };

    // Senden abbrechen
    const handleDialogCancel = () => {
        setDialogOpen(false);
        setPreview(null);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (cameraInputRef.current) cameraInputRef.current.value = "";
    };



    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                height: expanded ? 128 : 64,
                transition: 'height 0.3s',
                overflow: 'hidden',
                // Glow nach oben (y-offset negativ), weich und farbig
                boxShadow: '0 -8px 32px 0 rgba(140, 100, 225, 0.45), 0 4px 12px rgba(163, 144, 238, 0.2)',
            }}
            elevation={10}>
            {!expanded && (
                <Box
                    sx={{
                        background: '#3B3E5C',
                        height: 64,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0 4px 12px rgba(163, 144, 238, 0.2)',
                        filter: 'drop-shadow(0 0 30px rgba(140, 100, 225, 0.5))',
                        backdropFilter: 'blur(10px) saturate(180%)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <IconButton
                        onClick={handleToggleExpandWithAnimation}
                        sx={{
                            width: 56,
                            height: 56,
                            bgcolor: '#5A54D1',
                            color: '#fff',
                            borderRadius: '50%',
                            '&:hover': { bgcolor: '#6C64E1' },
                        }}
                    >
                        <KeyIcon
                            sx={{
                                fontSize: 32,
                                transition: 'transform 0.2s linear',
                                transform: rotating ? 'rotate(360deg)' : 'rotate(0deg)',
                            }}
                        />
                    </IconButton>
                </Box>
            )}
            {expanded && (
                <Box
                    sx={{
                        height: '100%',
                        px: 2,
                        pt: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        background: '#3B3E5C',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <Stack direction="row" spacing={6} justifyContent="center" alignItems="center">
                        <IconButton
                            sx={{
                                bgcolor: '#5A54D1',
                                color: '#fff',
                                width: 56,
                                height: 56,
                                '&:hover': {bgcolor: '#6C64E1'},
                            }}
                            onClick={() => cameraInputRef.current?.click()}
                        >
                            <CameraAltIcon sx={{fontSize: 32}}/>
                        </IconButton>
                        <IconButton
                            sx={{
                                bgcolor: '#5A54D1',
                                color: '#fff',
                                width: 56,
                                height: 56,
                                '&:hover': {bgcolor: '#6C64E1'},
                            }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <PhotoLibraryIcon sx={{fontSize: 32}}/>
                        </IconButton>
                        <input
                            ref={cameraInputRef}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            style={{display: 'none'}}
                            onChange={handleFileChange}
                        />
                        <input ref={fileInputRef}
                               type="file"
                               accept="image/*"
                               style={{display: 'none'}}
                               onChange={handleFileChange}
                        />
                    </Stack>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1}}>
                        <IconButton
                            sx={{
                                color: '#ff4141',
                                width: 48,
                                height: 48
                            }}
                            onClick={handleCancel}
                        >
                            <CancelIcon sx={{ fontSize: 28 }} />
                        </IconButton>
                    </Box>
                </Box>
            )}
            {/* Preview Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={handleDialogCancel}
                slotProps={{
                    paper: {
                        sx: {
                            bgcolor: 'rgba(36,17,86,0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(6px)',
                            borderRadius: 4,
                            color: '#fff',
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                        }
                    }
                }}
            >
                <DialogTitle
                    sx={{color: '#ffffff',
                    fontSize: '1.2rem',
                    textAlign: 'center'
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Icon
                            sx={{
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'transform 0.6s ease, opacity 0.6s ease',
                            transform: unlocking ? 'rotate(360deg) scale(1.3)' : 'none',
                            }}
                        >
                            {lockOpen ? <LockOpenIcon /> : <LockIcon />}
                        </Icon>
                    </Box>
                </DialogTitle>
                <DialogContent
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minWidth: 340,
                        minHeight: 200,
                    }}
                >
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            style={{
                                maxWidth: 300,
                                maxHeight: 300,
                                borderRadius: 16,
                                boxShadow: '0 0px 12px #6C64E1',
                                border: '1px solid #5A54D1',
                                background: 'rgba(55,55,255,0.08)',
                                backdropFilter: 'blur(4px)',
                            }}
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
                        sx={{
                            minWidth: 140,
                        color: '#fff',
                        fontSize: '1rem',
                        boxShadow: '0 4px 12px #ff4141',
                        textTransform: 'none',
                        backdropFilter: 'blur(14px)',
                        border: '1px solid rgba(255, 65, 65, 0.12)',
                        transition: 'all 0.2s ease-in-out',
                        borderRadius: '12px',
                        bgcolor: '#ff4141',
                        '&:hover': {
                            bgcolor: '#ff6565',
                        }
                        }}
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
                        sx={{
                            minWidth: 140,
                            color: '#ffffff',
                            fontSize: '1rem',
                            boxShadow: '0 4px 12px #6C64E1',
                            textTransform: 'none',
                            backdropFilter: 'blur(14px)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            transition: 'all 0.2s ease-in-out',
                            borderRadius: '12px',
                            bgcolor: '#5A54D1',
                            '&:hover': {
                                bgcolor: '#6C64E1',
                            }
                        }}
                    >
                        Senden
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default BottomBeforeUpload;

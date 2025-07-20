import React, { useState, useRef } from 'react';
import {
    Paper,
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
import {chatPageStyles} from "./chatPageStyles.ts";
import { hasUserPostedInGroupToday } from "../GroupPage/helpers/groupHelper";
import {useAuth} from "../context/AuthContext.tsx";


interface BottomBeforeUploadProps {
    onPostSent?: () => void;
}

const BottomBeforeUpload: React.FC<BottomBeforeUploadProps> = ({onPostSent}) => {
  
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
    const [hasPostedToday, setHasPostedToday] = useState<boolean>(false);
    const { userId } = useAuth();

    //const userId = '06aabba6-1002-4002-9840-2127decb9eea'; // TODO: nicht hardcode

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
        //const userId = '06aabba6-1002-4002-9840-2127decb9eea'; // TODO: nicht mehr hardcoden
        // Base64 extrahieren (ohne Data-URL-Präfix)
        const base64 = preview.split(',')[1];
        await sendGroupPost(userId, groupId, base64);
        // callback nach dem Senden um die UI zu aktualisieren
        if (onPostSent) onPostSent();

        // Nach dem Senden erneut prüfen, ob gepostet wurde
        try {
            const hasUserPosted = await hasUserPostedInGroupToday(userId, groupId);
            setHasPostedToday(hasUserPosted ?? false);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setHasPostedToday(false);
        }
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
            sx={{...chatPageStyles.paper, height: expanded ? 128 : 64}}
            elevation={10}>
            {!expanded && (
                <Box
                    sx={chatPageStyles.notExpandedBox}
                >
                    <IconButton
                        onClick={handleToggleExpandWithAnimation}
                        sx={chatPageStyles.notExpandedIconButton}
                        disabled={hasPostedToday}
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
                    sx={chatPageStyles.expandedBox}
                >
                    <Stack direction="row" spacing={6} justifyContent="center" alignItems="center">
                        <IconButton
                            sx={chatPageStyles.cameraInputButton}
                            onClick={() => cameraInputRef.current?.click()}
                        >
                            <CameraAltIcon sx={{fontSize: 32}}/>
                        </IconButton>
                        <IconButton
                            sx={chatPageStyles.libraryInputButton}
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
                            sx={chatPageStyles.cancelIconButton}
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
                        sx: chatPageStyles.dialogPaper
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
                            ...chatPageStyles.lockIcon,
                            transform: unlocking ? 'rotate(360deg) scale(1.3)' : 'none',
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
        </Paper>
    );
};

export default BottomBeforeUpload;

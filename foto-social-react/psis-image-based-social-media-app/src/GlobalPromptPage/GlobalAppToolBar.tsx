import React, { useState } from 'react';
import {
    Avatar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Popover,
    Dialog,
    DialogTitle,
    Icon,
    DialogContent,
    DialogActions, Button
} from '@mui/material';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CameraCapture from './CameraCapture';
import {chatPageStyles} from "../ChatPage/chatPageStyles.ts";
import KeyIcon from '@mui/icons-material/Key';
import {useAuth} from "../context/AuthContext.tsx";
import {sendGroupPost} from "../ChatPage/helpers/chatHelper.tsx";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";

const globalGroupId = '2a71f0a4-0768-4392-9ad5-f510a99b1d34';
interface GlobalAppToolBarProps {
    prompt: string;
}
const GlobalAppToolBar: React.FC<GlobalAppToolBarProps> = ({prompt}) => {
    const { userId, logout } = useAuth();
    const navigate = useNavigate();              // 获取跳转函数
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    // 从 location.state 读取传递的群组名
 // const prompttoday = location.state?.promptToday || 'undefined';

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [uploadAnchorEl, setUploadAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [lockOpen, setLockOpen] = useState(false);
    const [unlocking, setUnlocking] = useState(false);

    const handlePhotoCaptured = (imageData: string) => {
        setPreview(imageData);
        setDialogOpen(true);
        setSelectedFile(null); // Kein File-Objekt, da direkt aus Kamera
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Popover öffnen/schließen
    const handleUploadClick = (event: React.MouseEvent<HTMLButtonElement>) => setUploadAnchorEl(event.currentTarget);
    const handleCloseUploadPopover = () => setUploadAnchorEl(null);

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
        if (!preview || !userId) return;
        setUnlocking(true);
        setTimeout(() => setLockOpen(true), 600);
        const base64 = preview.split(',')[1];
        await sendGroupPost(userId, globalGroupId, base64);
        setDialogOpen(false);
        setPreview(null);
        setSelectedFile(null);
        setUnlocking(false);
        setLockOpen(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // Senden abbrechen
    const handleDialogCancel = () => {
        setDialogOpen(false);
        setPreview(null);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };


    return (
        <>
            <Toolbar sx={{
                width: '100vw', background: '#3B3E5C',
                boxShadow: '0 4px 12px rgba(163, 144, 238, 0.2)',
                backdropFilter: 'blur(10px) saturate(180%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            >
                <IconButton
                    size="large"
                    aria-label="account-icon"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleClick}
                >
                    <Avatar sx={{bgcolor: '#6C63FF'}}/>
                </IconButton>
                <Box sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Typography variant="h6" component="div" sx={{lineHeight: 1}}>
                        Global
                        {/* {groupname}   */}
                    </Typography>
                    <Typography variant="subtitle2" component="div" sx={{lineHeight: 1}}>
                        {prompt}
                        {/* {prompttoday} */}
                    </Typography>
                </Box>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="upload image"
                    color="inherit"
                    onClick={handleUploadClick}

                >
                    <KeyIcon/>
                </IconButton>

            </Toolbar>
            <Popover
                open={Boolean(uploadAnchorEl)}
                anchorEl={uploadAnchorEl}
                onClose={handleCloseUploadPopover}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: 'rgba(43, 46, 74, 0.75)',
                            backdropFilter: 'blur(10px) saturate(150%)',
                            borderRadius: 2,
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                            color: '#fff',
                            p: 1,
                        }
                    }
                }}
            >
                <Box sx={{display: 'flex', flexDirection: 'column', p: 1}}>
                    <IconButton onClick={() => {
                        fileInputRef.current?.click();
                        handleCloseUploadPopover();
                    }} sx={chatPageStyles.libraryInputButton}>
                        <PhotoLibraryIcon sx={{mr: 1}}/>
                    </IconButton>
                    <IconButton
                        sx={chatPageStyles.cameraInputButton}
                        onClick={() => {
                        setCameraOpen(true);
                        handleCloseUploadPopover();
                    }}>
                        <CameraAltIcon sx={{mr: 1}}/>
                    </IconButton>
                </Box>
            </Popover>

            <CameraCapture
                open={cameraOpen}
                onClose={() => setCameraOpen(false)}
                onCapture={handlePhotoCaptured}
            />

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={handleFileChange}
            />
            {/* Preview Dialog */}
            <Dialog open={dialogOpen} onClose={handleDialogCancel} slotProps={{ paper: { sx: chatPageStyles.dialogPaper } }}>
                <DialogTitle sx={{ color: '#ffffff', fontSize: '1.2rem', textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon sx={{ ...chatPageStyles.lockIcon, transform: unlocking ? 'rotate(360deg) scale(1.3)' : 'none' }}>
                            {lockOpen ? <LockOpenIcon /> : <LockIcon />}
                        </Icon>
                    </Box>
                </DialogTitle>
                <DialogContent sx={chatPageStyles.dialogContent}>
                    {preview && (
                        <img src={preview} alt="Preview" style={chatPageStyles.previewImage} />
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button onClick={handleDialogCancel} variant="contained" sx={chatPageStyles.dialogActionsCancelButton}>Abbrechen</Button>
                    <Button onClick={handleSend} variant="contained" sx={chatPageStyles.dialogActionsSendButton}>Senden</Button>
                </DialogActions>
            </Dialog>
        </>


    );
};

export default GlobalAppToolBar;

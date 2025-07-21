import React, { useRef } from 'react';
import {Dialog, DialogTitle, DialogContent, Button, Box, Icon, DialogActions} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { chatPageStyles } from '../ChatPage/chatPageStyles.ts';

const CameraCapture: React.FC<{ open: boolean; onClose: () => void; onCapture: (image: string) => void }> = ({ open, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Kamera konnte nicht gestartet werden:', err);
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
  };

  const handleCapture = () => {
    if (!canvasRef.current || !videoRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    canvasRef.current.width = width;
    canvasRef.current.height = height;

    ctx.drawImage(videoRef.current, 0, 0, width, height);

    const imageData = canvasRef.current.toDataURL('image/png'); // base64 image data,图像数据
    console.log('Captured image base64 (preview)', imageData.slice(0, 100)); // 可选打印预览

    // 自动下载图片, download photo automated
    // const link = document.createElement('a');
    // link.href = imageData;
    // link.download = 'photo.png'; // 下载文件名, the file name of downloaded photo
    // document.body.appendChild(link); // 需要添加到DOM才能触发点击
    // link.click();
    // document.body.removeChild(link);

    onCapture(imageData); // 把图像数据传出, send image data

    onClose();
    stopCamera();
  };

  React.useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }
    return stopCamera;
  }, [open]);

  return (
      <Dialog
          open={open}
          onClose={() => { stopCamera(); onClose(); }}
          fullWidth
          maxWidth="xs"
          slotProps={{ paper: { sx: chatPageStyles.dialogPaper } }}
      >
        <DialogTitle
            sx={{
              color: '#ffffff',
              fontSize: '1.2rem',
              textAlign: 'center',
              pb: 0,
            }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', mb: 2 }}>
            <Icon sx={{ color: '#fff', fontSize: 32, mr: 1 }}>
              <CameraAltIcon />
            </Icon>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ ...chatPageStyles.dialogContent, pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <video
              ref={videoRef}
              style={{
                width: '100%',
                maxWidth: 320,
                borderRadius: 16,
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                marginBottom: 16,
                background: '#22223b'
              }}
              autoPlay
              playsInline
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </Box>
      </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
              onClick={() => { stopCamera(); onClose(); }}
              variant="contained"
              sx={chatPageStyles.dialogActionsCancelButton}
          >
            Abbrechen
          </Button>
          <Button
              onClick={handleCapture}
              variant="contained"
              sx={chatPageStyles.dialogActionsSendButton}
          >
            Aufnehmen
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default CameraCapture;
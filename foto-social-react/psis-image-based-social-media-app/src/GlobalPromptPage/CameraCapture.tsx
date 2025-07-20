import React, { useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Box } from '@mui/material';

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
    const imageData = canvasRef.current.toDataURL('image/png'); // base64

    onCapture(imageData); // Bild an Parent-Komponente übergeben
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
      <Dialog open={open} onClose={() => { stopCamera(); onClose(); }} fullWidth maxWidth="sm"
              disableEnforceFocus
              disableRestoreFocus
      >
        <DialogTitle>Use Camera</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <video ref={videoRef} style={{ width: '100%', borderRadius: 8 }} />
            <Button variant="contained" color="primary" onClick={handleCapture} sx={{ mt: 2 }}>
              take a photo
            </Button>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </Box>
        </DialogContent>
      </Dialog>
  );
};

export default CameraCapture;
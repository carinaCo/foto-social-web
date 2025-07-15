import React, { useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Box } from '@mui/material';

const CameraCapture: React.FC<{ open: boolean; onClose: () => void; onCapture: (image: string) => void }> = ({ open, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 启动摄像头,open camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('无法访问摄像头:', err);
    }
  };

  // 关闭摄像头,close camera
  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
  };

  // 拍照逻辑, the logic of how to take a photo
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

    // 自动下载图片, download photo automated
    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'photo.png'; // 下载文件名, the file name of downloaded photo
    document.body.appendChild(link); // 需要添加到DOM才能触发点击
    link.click();
    document.body.removeChild(link);

    onCapture(imageData); // 把图像数据传出, send image data
    onClose();
    stopCamera();
  };

  // 启动摄像头（在弹窗打开时）, when pop up, start camera
  React.useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }
    return stopCamera; // 组件卸载时也关闭
  }, [open]);

  return (
    <Dialog open={open} onClose={() => { stopCamera(); onClose(); }} fullWidth maxWidth="sm" 
    disableEnforceFocus  // 关闭强制焦点锁定，排查焦点管理问题
    disableRestoreFocus  // 关闭焦点恢复
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
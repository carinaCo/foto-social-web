const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// 允许前端跨域访问（React 默认运行在 3000）
// Allow cross-domain access to the frontend (React runs on 3000 by default)
app.use(cors());

// 创建 uploads 文件夹（如果不存在）
//create uploads file(if not exists)
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 设置 multer 存储规则
// Set up multer storage rules
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // 上传到 uploads/ upload to file uploads
  },
  filename: (req, file, cb) => {
    // 使用时间戳+原始文件名，避免重复
    // Use timestamp + original file name to avoid duplication
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// 路由：接收单张图片上传
// Routing: Receive a single image upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'did not receive file' });
  }

  console.log('received file:', req.file.originalname);

  res.json({
    message: 'upload successfully',
    filename: req.file.filename,
    path: '/uploads/' + req.file.filename,
  });
});

// 启动服务器
// Start the server
app.listen(PORT, () => {
  console.log(`backend server started: http://localhost:${PORT}`);
});
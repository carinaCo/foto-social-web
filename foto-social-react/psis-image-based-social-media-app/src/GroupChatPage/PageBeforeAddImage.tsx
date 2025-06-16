import React, { useState } from 'react';
//import { ArrowBack, AddToPhotos, HideImage, PhotoCameraBack} from "@mui/material";
//import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HideImageIcon from '@mui/icons-material/HideImage';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

interface ChatMessage {
  id: number;
  userId: string;
  username: string;
  hasImage: boolean;
  timestamp: string;
}

const GroupChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      userId: '001',
      username: 'Alice',
      hasImage: true,
      timestamp: '10:30'
    },
    {
      id: 2,
      userId: '002',
      username: 'Bob',
      hasImage: true,
      timestamp: '10:35'
    },
    {
      id: 3,
      userId: '003',
      username: 'Charlie',
      hasImage: true,
      timestamp: '10:40'
    },
    {
      id: 4,
      userId: '004',
      username: 'Diana',
      hasImage: true,
      timestamp: '10:45'
    }
  ]);

  const handleBackClick = () => {
    console.log('return to main page');
    // 这里可以添加路由跳转逻辑
    alert('return to main page');
  };

  const handleTopAddClick = () => {
    console.log('click add');
    // 这里可以添加添加成员或其他功能
    alert('click add');
  };

  const handleUploadClick = () => {
    console.log('click upload image');
    // 这里可以添加图片上传逻辑
    alert('click upload image');
  };

  const getAvatarColor = (userId: string) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    const index = userId.charCodeAt(userId.length - 1) % colors.length;
    return colors[index];
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* 顶部导航栏 */}
      <header className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
        {/* 左侧返回按钮 */}
        <button
          onClick={handleBackClick}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowBackIcon fontSize="medium" />
        </button>

        {/* 中间标题区域 */}
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">GroupName</h1>
          <p className="text-lg text-gray-300">happyplace</p>
        </div>

        {/* 右侧更多按钮 */}
        <button
          onClick={handleTopAddClick}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <MoreHorizIcon fontSize="medium" />
        </button>
      </header>

      {/* 中部聊天界面 */}
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-3">
              {/* 用户头像 */}
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: getAvatarColor(message.userId) }}
              >
                <PersonOutlineIcon fontSize="medium" />
              </div>

              {/* 消息内容 */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-800">{message.username}</span>
                  <span className="text-sm text-gray-500">{message.timestamp}</span>
                </div>

                {/* 图片占位符 */}
                {message.hasImage && (
                  <div className="bg-gray-300 rounded-lg p-8 flex flex-col items-center justify-center border-2 border-dashed border-gray-400">
                    <HideImageIcon className="text-gray-500 mb-2" fontSize="large" />
                    <p className="text-gray-600 text-sm">User has already uploaded image</p>
                    <p className="text-gray-500 text-xs mt-1">Image is hidden</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 底部栏 */}
      <footer className="bg-gray-800 px-4 py-3">
        <div className="flex justify-center">
          <button 
            onClick={handleUploadClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-colors"
          >
            <AddPhotoAlternateIcon fontSize="medium" />
            <span className="font-medium">upload image</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default GroupChatPage;
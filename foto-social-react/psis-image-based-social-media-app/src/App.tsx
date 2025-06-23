import {Route, Routes } from 'react-router-dom';
import './App.css'
import MainPage from "./MainPage/mainpage.tsx";
import {createTheme, ThemeProvider, CssBaseline} from "@mui/material";
import BottomNavigationBar from "./MainPage/bottomNavigationBar.tsx";
import Login from "./Authentification/Login.tsx"
import Register from "./Authentification/Register.tsx"
import ChatPage from "./ChatPage/ChatPage.tsx"; 
import GlobalPromptPage from "./GlobalPromptPage/GlobalPromptPage.tsx";
import SettingsPage from "./SettingsPage/SettingsPage.tsx";
import FriendsPage from "./FriendsPage/friendsPage.tsx";

const darkTheme = createTheme({
  
  palette: {
    mode: 'dark',
      background: {
        default: '#3B3E5C'
      }
  },
});

const isNavBarVisible = () => {
    switch (location.pathname) {
        case '/login':
            return false;
        case '/register':
            return false;
        default:
            return true;
    }
};

const App = () => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Routes>
            <Route path="/global" element={<GlobalPromptPage />} />
            <Route path="/groups" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/chat/:id" element={<ChatPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* TODO: Hier dann die friends bzw. settings page auskommentieren */}
            <Route path="/friends" element={<FriendsPage />} />
            {/*<Route path="/settings" element={<SettingsPage />} />*/}
        </Routes>
          {isNavBarVisible() ? (
        <BottomNavigationBar  />
          ) : <></>}
    </ThemeProvider>
    </>
  )
}

export default App

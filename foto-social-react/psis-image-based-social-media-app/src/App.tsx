import {Route, Routes } from 'react-router-dom';
import './App.css'
import MainPage from "./MainPage/mainpage.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import BottomNavigationBar from "./MainPage/bottomNavigationBar.tsx";
import Login from "./Authentification/Login.tsx"
import Register from "./Authentification/Register.tsx"
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Routes>
            <Route path="/groups" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* TODO: Hier dann die friends bzw. settings page auskommentieren */}
            {/*<Route path="/friends" element={<FriendsPage />} />*/}
            {/*<Route path="/settings" element={<SettingsPage />} />*/}
        </Routes>
        <BottomNavigationBar />
    </ThemeProvider>
    </>
  )
}

export default App

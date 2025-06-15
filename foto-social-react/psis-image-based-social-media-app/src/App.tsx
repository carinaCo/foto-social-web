import {Route, Routes } from 'react-router-dom';
import './App.css'
import MainPage from "./MainPage/mainpage.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import BottomNavigationBar from "./MainPage/bottomNavigationBar.tsx";

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

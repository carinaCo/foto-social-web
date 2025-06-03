import { useState } from 'react'
import './App.css'
import MainPage from "./MainPage/mainpage.tsx";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [count, setCount] = useState<number>(0)

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <MainPage name={'photoMerger'}></MainPage>
      </ThemeProvider>
    </>
  )
}

export default App

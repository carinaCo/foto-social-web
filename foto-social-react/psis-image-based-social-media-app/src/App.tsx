//import React from 'react';
import './App.css';
//import MainPage from "./MainPage/mainpage.tsx";
import ChatPage from "./GroupChatPage/ChatPage.tsx";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// function App() {
//   const [count, setCount] = useState<number>(0)

//   return (
//     <>
//       <ThemeProvider theme={darkTheme}>
//         <CssBaseline />
//         <ChatPage name={'photoMerger'}></ChatPage>
//       </ThemeProvider>
//     </>
//   )
// }

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
     <CssBaseline />
     <div className="App">
      <ChatPage />
     </div>
    </ThemeProvider>
  );
}

export default App

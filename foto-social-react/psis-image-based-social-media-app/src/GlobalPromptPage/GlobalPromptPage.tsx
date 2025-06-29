import * as React from 'react';
import {
    AppBar, CssBaseline
} from "@mui/material";
import AppToolbar from "../MainPage/AppToolbar.tsx";

const GlobalPromptPage: React.FC = () => {
    return (
        <>
            <CssBaseline enableColorScheme />
            <AppBar>
                <AppToolbar/>
            </AppBar>
        </>
    )
}

export default GlobalPromptPage;

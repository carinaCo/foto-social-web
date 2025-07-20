import {Box} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

interface LoadingPlaceholderProps {
    message?: string;
}
const LoadingPlaceholder: React.FC<LoadingPlaceholderProps> = ({ message }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2 }}>
                {message}
                <CircularProgress />
            </Box>
        </Box>
    )
}

export default LoadingPlaceholder;
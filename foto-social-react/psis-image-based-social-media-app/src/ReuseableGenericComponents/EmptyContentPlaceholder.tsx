import {Box} from "@mui/material";
import React from "react";

interface EmptyContentPlaceholderProps {
    message?: string;
}
const EmptyContentPlaceholder: React.FC<EmptyContentPlaceholderProps> = ({ message }) => {
    return (
        <Box>
            {message}
        </Box>
    )
}

export default EmptyContentPlaceholder;
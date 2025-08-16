import {Box} from "@mui/material";
import React from "react";

interface EmptyContentPlaceholderProps {
    message?: string | React.ReactNode;
}

/**
 * Einfacher Platzhaltzer Component für leere Inhalte.
 * Anzeigetext kann über message-Prop angepasst werden.
 */
const EmptyContentPlaceholder: React.FC<EmptyContentPlaceholderProps> = ({ message }) => {
    return (
        <Box>
            {message}
        </Box>
    )
}

export default EmptyContentPlaceholder;
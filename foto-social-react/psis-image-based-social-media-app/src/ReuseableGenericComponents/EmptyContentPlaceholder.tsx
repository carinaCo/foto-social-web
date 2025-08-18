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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2 }}>
                {message}
            </Box>
        </Box>
    )
}

export default EmptyContentPlaceholder;
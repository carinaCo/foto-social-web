// ThemeContext.tsx
import React, { createContext, useMemo, useState, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

type ThemeContextType = {
    setBackgroundColor: (color: string) => void;
    backgroundColor: string;
    availableColors: { name: string; value: string }[];
};

const ColorModeContext = createContext<ThemeContextType>({
    setBackgroundColor: () => {},
    backgroundColor: "#3B3E5C",
    availableColors: [],
});

export const useColorMode = () => useContext(ColorModeContext);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [backgroundColor, setBackgroundColor] = useState("#3B3E5C");

    const availableColors = [
        { name: "Deep Space (Default)", value: "#3B3E5C" },
        { name: "Void", value: "#000000" },
        { name: "Jade", value: "rgba(0,82,71,0.8)" },
        { name: "Cherry", value: "rgba(105,17,17,0.8)" },
        { name: "Bubblegum", value: "rgba(128,41,99,0.8)" }, // cherry glass 802963FF
        { name: "Ocean", value: "rgba(0,32,56,0.8)" },
        { name: "Forest", value: "rgba(11,28,0,0.8)" },
    ];

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: "dark",
                    background: {
                        default: backgroundColor,
                    },
                }
            }),
        [backgroundColor]
    );

    return (
        <ColorModeContext.Provider value={{ setBackgroundColor, backgroundColor, availableColors }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};

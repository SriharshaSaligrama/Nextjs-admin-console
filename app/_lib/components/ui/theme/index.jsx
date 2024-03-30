'use client'

import React, { createContext, useMemo, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

const Theme = (props) => {
    const { children, loggedInUser } = props

    const [mode, setMode] = useState(loggedInUser?.theme || 'light');

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode(mode === 'light' ? 'dark' : 'light');
        },
    }), [mode]);

    const theme = useMemo(() => createTheme({ palette: { mode: loggedInUser?.theme } }), [loggedInUser?.theme]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default Theme
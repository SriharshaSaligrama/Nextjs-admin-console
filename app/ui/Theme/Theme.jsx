'use client'

import React, { createContext, useMemo, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

const Theme = (props) => {
    const { children } = props

    const [mode, setMode] = useState('light');

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
    }), []);

    const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default Theme
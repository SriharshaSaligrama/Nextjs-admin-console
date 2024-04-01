'use client'

import React, { createContext, useState } from 'react'
import { ThemeProvider } from '@mui/material';
import useSetTheme from './hook';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

const Theme = (props) => {
    const { children, loggedInUser } = props

    const [mode, setMode] = useState(loggedInUser?.theme || 'light');

    const { theme, colorMode } = useSetTheme({ mode, setMode, loggedInUser })

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default Theme
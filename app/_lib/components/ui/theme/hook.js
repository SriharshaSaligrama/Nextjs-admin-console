import { useMemo } from "react";
import { createTheme } from '@mui/material';

const useSetTheme = ({ setMode, loggedInUser }) => {
    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
        },
    }), [setMode]);

    const theme = useMemo(() => createTheme({ palette: { mode: loggedInUser?.theme } }), [loggedInUser?.theme]);

    return { theme, colorMode }
}

export default useSetTheme
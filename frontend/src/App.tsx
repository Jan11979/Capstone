import React, {useEffect} from 'react';
import './App.scss';
import Box from '@mui/material/Box';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {CssBaseline, useMediaQuery} from "@mui/material";
import AuthProvider from "./page/login/AuthProvider";
import LoginRootFrame from "./page/login/LoginRootFrame";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

function App() {

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.default',
                    color: 'text.primary',
                    borderRadius: 1,
                    p: 3,
                }}
            >
                <div className="App">
                    <LoginRootFrame/>
                </div>
            </Box>

        </div>
    );
}

export default function ToggleColorMode() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const themeSystem = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );
    const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );
    useEffect(() => {
        setMode(prefersDarkMode ? 'dark' : 'light')
    }, [themeSystem])

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

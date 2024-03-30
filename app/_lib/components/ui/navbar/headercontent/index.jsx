import React from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { Avatar, Box, IconButton, Stack, Toolbar, Typography, useTheme, Zoom } from '@mui/material'
import { BrightnessMediumOutlined, DarkModeOutlined, LightModeOutlined, Menu } from '@mui/icons-material'
import { editUserAction } from '@/app/_lib/db/user/actions';
import { createFormData } from '@/app/_lib/utils';

const ThemeButton = () => {
    const theme = useTheme();

    const { pending } = useFormStatus();

    return <IconButton type='submit' color="inherit" disabled={pending}>
        {
            theme.palette.mode === 'dark' ?
                pending ? <BrightnessMediumOutlined /> : <Zoom in={!pending}><DarkModeOutlined /></Zoom> :
                pending ? <BrightnessMediumOutlined /> : <Zoom in={!pending}><LightModeOutlined /></Zoom>
        }
    </IconButton>
}

const HeaderContent = (props) => {
    const { open, handleDrawerOpen, handleUserMenuClick, session, loggedInUser } = props

    const [state, dispatch] = useFormState(editUserAction, {});

    const theme = useTheme();

    const handleToggleDarkMode = () => {
        dispatch(createFormData({ ...loggedInUser, theme: theme.palette.mode === 'dark' ? 'light' : 'dark' }));
        if (state) state.mode = theme.palette.mode
    }

    return (
        <Toolbar>
            <IconButton
                color="inherit"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                    marginRight: 5,
                    ...(open && { display: 'none' }),
                }}
            >
                <Menu />
            </IconButton>
            <Stack
                sx={{ ...styles.headerContentStack }}
                direction={'row'}
                spacing={2}
            >
                <Typography variant="h6" noWrap component="div">
                    Admin Console
                </Typography>
                <Box
                    component='form'
                    action={handleToggleDarkMode}
                >
                    <ThemeButton />
                    <IconButton color="inherit" onClick={handleUserMenuClick} sx={{ ml: 2 }}>
                        <Avatar sx={{ ...styles.avatar }}>{session?.fullName?.[0]}</Avatar>
                    </IconButton>
                </Box>
            </Stack>
        </Toolbar>
    )
}

export default HeaderContent

const styles = {
    headerContentStack: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    avatar: {
        width: 26,
        height: 26
    }
}
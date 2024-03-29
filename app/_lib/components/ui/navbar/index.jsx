'use client'

import React, { useContext } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Avatar, Box, Menu, MenuItem, Toolbar, IconButton, Typography, Divider, useTheme, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Tooltip } from '@mui/material'
import { ChevronLeft, ChevronRight, DarkModeOutlined, LightModeOutlined, Logout, Menu as MenuIcon } from '@mui/icons-material';
import { ColorModeContext } from '../theme';
import DrawerHeader from './drawerheader';
import Drawer from './drawer';
import AppBar from './appbar';
import useNavbar from './hook';
import { navbarListItems } from '@/app/_lib/constants';
import LoginForm from '../login';
import { logoutAction } from '@/app/_lib/db/user/actions';

const drawerWidth = 240;

const Navbar = (props) => {
    const router = useRouter()

    const pathname = usePathname()

    const theme = useTheme();

    const colorMode = useContext(ColorModeContext);

    const { open, handleDrawerOpen, handleDrawerClose } = useNavbar()

    const { children, session, ...rest } = props

    const [userMenuAnchorEl, setUserMenuAnchorEl] = React.useState(null);

    const openUserMenu = Boolean(userMenuAnchorEl);

    const handleUserMenuClick = (event) => {
        setUserMenuAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuAnchorEl(null);
    };

    return (
        !session?.exp ? <LoginForm /> : <Box sx={{ display: 'flex' }} {...rest}>
            <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        spacing={2}
                        width={'100%'}
                    >
                        <Typography variant="h6" noWrap component="div">
                            Admin Console
                        </Typography>
                        <Box>
                            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                                {theme.palette.mode === 'dark' ? <DarkModeOutlined /> : <LightModeOutlined />}
                            </IconButton>
                            <IconButton color="inherit" onClick={handleUserMenuClick}>
                                <Avatar sx={{ width: 26, height: 26 }}>{session?.fullName?.[0]}</Avatar>
                            </IconButton>
                        </Box>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {navbarListItems?.map((item) => (
                        <Tooltip key={item?.title} title={item?.title} placement='right'>
                            <ListItem
                                disablePadding
                                sx={{
                                    display: 'block',
                                    bgcolor: pathname === item?.path && theme.palette.action.selected
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    onClick={() => { router.push(item?.path) }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item?.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item?.title} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </Tooltip>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
            <Menu
                disableScrollLock
                anchorEl={userMenuAnchorEl}
                open={openUserMenu}
                onClose={handleUserMenuClose}
                onClick={handleUserMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Typography fontWeight={700} noWrap>{session?.fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => logoutAction()}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default Navbar
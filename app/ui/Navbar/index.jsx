'use client'

import React, { useContext } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Box, Toolbar, IconButton, Typography, Divider, useTheme, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Tooltip } from '@mui/material'
import { ChevronLeft, ChevronRight, DarkModeOutlined, LightModeOutlined, Menu } from '@mui/icons-material';
import { ColorModeContext } from '../Theme';
import DrawerHeader from './DrawerHeader';
import Drawer from './Drawer';
import AppBar from './AppBar';
import useNavbar from './hook';
import { navbarListItems } from '@/app/lib/constants';

const drawerWidth = 240;

const Navbar = (props) => {
    const router = useRouter()

    const pathname = usePathname()

    const theme = useTheme();

    const colorMode = useContext(ColorModeContext);

    const { open, handleDrawerOpen, handleDrawerClose } = useNavbar()

    const { children, ...rest } = props

    return (
        <Box sx={{ display: 'flex' }} {...rest}>
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
                        <Menu />
                    </IconButton>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={2} width={'100%'}>
                        <Typography variant="h6" noWrap component="div">
                            Admin Console
                        </Typography>
                        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <DarkModeOutlined /> : <LightModeOutlined />}
                        </IconButton>
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
                            <ListItem disablePadding sx={{ display: 'block', bgcolor: pathname === item?.path && theme.palette.action.selected }}>
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
        </Box>
    )
}

export default Navbar
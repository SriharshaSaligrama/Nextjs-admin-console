'use client'

import React from 'react'
import { Box, IconButton, Divider, useTheme } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import DrawerHeader from './drawerheader';
import Drawer from './drawer';
import AppBar from './appbar';
import useNavbar from './hooks/drawerHook';
import LoginForm from '../login';
import NavBarList from './navbarlist';
import useMenuHook from './hooks/menuHook';
import LogoutMenu from './logoutmenu';
import HeaderContent from './headercontent';

const drawerWidth = 240;

const Navbar = (props) => {
    const theme = useTheme();

    const { open, handleDrawerOpen, handleDrawerClose } = useNavbar()

    const { children, session, loggedInUser, ...rest } = props

    const { userMenuAnchorEl, openUserMenu, handleUserMenuClick, handleUserMenuClose } = useMenuHook();

    return (
        !session?.email ? <LoginForm /> : <Box sx={{ display: 'flex' }} {...rest}>
            <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
                <HeaderContent
                    open={open}
                    handleDrawerOpen={handleDrawerOpen}
                    loggedInUser={loggedInUser}
                    handleUserMenuClick={handleUserMenuClick}
                    session={session}
                />
            </AppBar>
            <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <NavBarList open={open} />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
            <LogoutMenu
                session={session}
                userMenuAnchorEl={userMenuAnchorEl}
                openUserMenu={openUserMenu}
                handleUserMenuClose={handleUserMenuClose}
            />
        </Box>
    )
}

export default Navbar
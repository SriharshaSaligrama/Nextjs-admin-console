import React from 'react'
import { logoutAction } from '@/app/_lib/db/user/actions';
import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { Logout } from '@mui/icons-material';

const LogoutMenu = (props) => {
    const { session, userMenuAnchorEl, openUserMenu, handleUserMenuClose } = props

    return (
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
                <ListItemIcon>
                    <Avatar sx={{ width: 22, height: 22 }} >{session?.fullName?.[0]}</Avatar>
                </ListItemIcon>
                <ListItemText primary={`${session?.fullName}`} />
            </MenuItem>
            <MenuItem onClick={() => logoutAction()}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    )
}

export default LogoutMenu
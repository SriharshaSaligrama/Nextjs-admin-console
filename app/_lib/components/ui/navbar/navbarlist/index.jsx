import React from 'react'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, useTheme } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { navbarListItems } from '@/app/_lib/constants'

const NavBarList = (props) => {
    const { open } = props

    const router = useRouter()

    const pathname = usePathname()

    const theme = useTheme();

    return (
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
    )
}

export default NavBarList
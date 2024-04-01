import { Drawer as MuiDrawer, useTheme } from '@mui/material'
import { closedMixin, openedMixin } from './utils';

const Drawer = (props) => {
    const { open, children, drawerWidth, ...rest } = props
    const theme = useTheme();

    const drawerStyle = {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin({ theme, drawerWidth }),
            '& .MuiDrawer-paper': openedMixin({ theme, drawerWidth }),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }

    return (
        <MuiDrawer sx={drawerStyle} {...rest}>
            {children}
        </MuiDrawer>
    )
}

export default Drawer
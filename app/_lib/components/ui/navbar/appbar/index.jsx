import { AppBar as MuiAppBar, useTheme } from '@mui/material'

const AppBar = (props) => {
    const { open, children, drawerWidth, ...rest } = props
    const theme = useTheme();

    const appbarStyle = {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen + 500,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen + 500,
            }),
        }),
    }

    return (
        <MuiAppBar sx={appbarStyle} {...rest}>
            {children}
        </MuiAppBar>
    )
}

export default AppBar
import { Box, useTheme } from '@mui/material'

const DrawerHeader = (props) => {
    const { children, ...rest } = props
    const theme = useTheme();

    const drawerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }

    return (
        <Box sx={drawerStyle} {...rest}>{children}</Box>
    )
}

export default DrawerHeader
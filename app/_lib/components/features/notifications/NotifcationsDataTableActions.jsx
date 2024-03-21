import React from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'
import { useRouter } from 'next/navigation'
import { DeleteOutlined, EditOutlined, VisibilityOutlined } from '@mui/icons-material'

const NotifcationsDataTableActions = (props) => {
    const { cellValues } = props
    const router = useRouter()

    return (
        <Box sx={{ ...styles.actionButtonsContainer }}>
            <Tooltip title="Edit">
                <IconButton onClick={() => router.push(`/notifications/edit/${cellValues.row.id}`)}>
                    <EditOutlined fontSize='small' color='warning' />
                </IconButton>
            </Tooltip>
            <Tooltip title="View">
                <IconButton onClick={() => router.push(`/notifications/view/${cellValues.row.id}`)}>
                    <VisibilityOutlined fontSize='small' color='primary' />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton onClick={() => router.push(`/notifications/dependencies/${cellValues.row.id}`)}>
                    <DeleteOutlined fontSize='small' color='error' />
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default NotifcationsDataTableActions

const styles = {
    actionButtonsContainer: {
        display: "flex",
        columnGap: "8px",
    }
}
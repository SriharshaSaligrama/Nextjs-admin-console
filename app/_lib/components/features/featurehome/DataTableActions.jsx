import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'
import { DeleteOutlined, EditOutlined, VisibilityOutlined } from '@mui/icons-material'
import { dataTableActionsPageLinks } from '../../../constants'

const DataTableActions = (props) => {
    const { cellValues, showViewButton } = props
    const router = useRouter()
    const pathname = usePathname()
    const returnLink = dataTableActionsPageLinks[pathname.split('/')[1]] || '';

    return (
        <Box sx={{ ...styles.actionButtonsContainer }}>
            <Tooltip title="Edit">
                <IconButton onClick={() => router.push(`/${returnLink}/edit/${cellValues.row.id}`)}>
                    <EditOutlined fontSize='small' color={showViewButton ? 'warning' : 'primary'} />
                </IconButton>
            </Tooltip>
            {showViewButton && <Tooltip title="View">
                <IconButton onClick={() => router.push(`/${returnLink}/view/${cellValues.row.id}`)}>
                    <VisibilityOutlined fontSize='small' color='primary' />
                </IconButton>
            </Tooltip>}
            <Tooltip title="Delete">
                <IconButton onClick={() => router.push(`/${returnLink}/dependencies/${cellValues.row.id}`)}>
                    <DeleteOutlined fontSize='small' color='error' />
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default DataTableActions

const styles = {
    actionButtonsContainer: {
        display: "flex",
        columnGap: "8px",
    }
}
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'
import { DeleteOutlined, EditOutlined } from '@mui/icons-material'

const DataTableActions = (props) => {
    const { cellValues, handleDelete } = props
    const router = useRouter()
    const pathname = usePathname()
    const returnLink = pathname.includes('departments') ? 'departments' :
        pathname.includes('categories') ? 'categories' :
            pathname.includes('locations') ? 'locations' :
                pathname.includes('buildings') ? 'buildings' :
                    pathname.includes('users') ? 'users' : ''

    return (
        <Box sx={{ ...styles.actionButtonsContainer }}>
            <Tooltip title="Edit">
                <IconButton onClick={() => router.push(`/${returnLink}/edit/${cellValues.row.id}`)}>
                    <EditOutlined fontSize='small' color='primary' />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton onClick={handleDelete ? () => handleDelete(cellValues.row.id) : () => router.push(`/${returnLink}/dependencies/${cellValues.row.id}`)}>
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
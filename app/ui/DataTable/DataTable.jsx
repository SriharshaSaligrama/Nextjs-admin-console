import React from 'react'
import { Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const DataTable = (props) => {
    const { columns, rows } = props
    return (
        <Box sx={{ height: '420px' }}>
            <DataGrid
                columns={columns}
                rows={rows}
                autoPageSize
                slots={{
                    toolbar: GridToolbar,
                }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
            />
        </Box>
    )
}

export default DataTable
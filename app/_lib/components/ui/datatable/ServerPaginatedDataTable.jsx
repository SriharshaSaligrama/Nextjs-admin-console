// 'use client'

import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const ServerPaginatedDataTable = (props) => {
    const { columns, rows, loading, paginationModel, setPaginationModel, pageInfo, pageSizeOptions } = props

    const [rowCountState, setRowCountState] = useState(
        pageInfo?.totalDocuments || 0
    );


    useEffect(() => {
        setRowCountState((prevRowCountState) =>
            pageInfo?.totalDocuments !== undefined
                ? pageInfo?.totalDocuments
                : prevRowCountState
        );
    }, [pageInfo?.totalDocuments])

    return (
        <Box sx={{ height: '70vh' }}>
            <DataGrid
                columns={columns}
                rows={rows}
                rowCount={rowCountState}
                loading={!!loading}
                paginationMode="server"
                pageSizeOptions={pageSizeOptions}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
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

export default ServerPaginatedDataTable
import React from 'react'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import globalStyles from '@/app/globalStyles'
import { DeleteOutlined } from '@mui/icons-material'

const SelectedLocationsTable = (props) => {
    const { locations, notifications, dispatch } = props

    return (
        <TableContainer component={Paper} sx={{ ...styles.tableContainer }}>
            <Table stickyHeader >
                <TableHead>
                    <TableRow>
                        <TableCell>Location</TableCell>
                        <TableCell>Buildings</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        notifications?.locations?.map((location) => (
                            <TableRow key={location?.location}>
                                <TableCell>{locations?.find(ln => ln?.id === location?.location)?.name}</TableCell>
                                <TableCell>{
                                    location?.buildings?.map(buildingId => {
                                        const selectedLocation = locations?.find(ln => {
                                            return ln?.id === location?.location
                                        })
                                        const building = selectedLocation?.buildings?.find(b => {
                                            return b.id === buildingId
                                        });
                                        return building?.name
                                    })?.join(', ')
                                }
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => dispatch({
                                            type: 'handleRemoveFromBuildingsListButtonClick',
                                            location: location?.location
                                        })}
                                    >
                                        <DeleteOutlined color='error' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SelectedLocationsTable

const styles = {
    tableContainer: {
        maxHeight: '240px',
        overflow: 'auto',
        ...globalStyles.thinScrollBar,
        boxShadow: 12
    }
}
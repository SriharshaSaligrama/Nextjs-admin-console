import React from 'react'
import PageHeading from '../../ui/pageheading'
import { ArrowBack, DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Box, Grid, IconButton, Paper, Stack, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Tooltip, Typography } from '@mui/material'
import globalStyles from '@/app/globalStyles'

export const Header = ({ id }) => {
    return (
        <Box sx={{ ...styles.header.container }}>
            <PageHeading heading='View Notification Mapping' />
            <Box sx={{ ...styles.header.actionButtonsContainer }}>
                <Tooltip title='Edit Notification Mapping'>
                    <IconButton href={`/notifications/edit/${id}`}>
                        <EditOutlined color='warning' />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Delete Notification Mapping'>
                    <IconButton href={`/notifications/dependencies/${id}`}>
                        <DeleteOutlined color='error' />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Back to Notification Mappings'>
                    <IconButton href={`/notifications`}>
                        <ArrowBack color='primary' />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
}

export const CategoryDepartment = ({ entities, heading }) => {
    return <Typography component={'span'}>
        <Typography component={'span'} sx={{ ...styles.groupsTable.heading }}>{heading}: </Typography>
        <Typography component={'span'}>
            {entities?.map((entity) => entity?.name).join(', ')}
        </Typography>
    </Typography>
}

export const GroupsTable = ({ notificationMap }) => {
    return <>
        <Typography sx={{ ...styles.groupsTable.heading }}>Groups: </Typography>
        <Grid container spacing={2} sx={{ maxHeight: '450px', pb: 2, overflow: 'auto', ...globalStyles.thinScrollBar }}>
            {notificationMap?.groups?.map((group) => <Grid item key={group?.id} xs={4} >
                <Stack spacing={2} component={Paper} elevation={10} sx={{ ...styles.groupsTable.groupCardContainer }}>
                    <Typography noWrap><b>Name: </b>{group?.name}</Typography>
                    <Typography noWrap><b>Code: </b>{group?.code}</Typography>
                    {group?.description && <Typography noWrap><b>Description: </b>{group?.description}</Typography>}
                    <Typography sx={{ fontWeight: 600 }}>Members:</Typography>
                    {group?.members?.length > 0 ? <TableContainer sx={{ ...styles.groupsTable.tableContainer, ...globalStyles.thinScrollBar }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {[
                                        {
                                            id: 'email',
                                            label: 'Email',
                                        },
                                        {
                                            id: 'type',
                                            label: 'Type',
                                        }
                                    ].map((column) => (
                                        <TableCell key={column?.id}>{column?.label}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {group?.members?.map((member) => (
                                    <TableRow key={member?.email}>
                                        <TableCell>{member?.email}</TableCell>
                                        <TableCell>{member?.type}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> : <Box sx={{ height: 200, ...globalStyles.centerDiv }}>
                        <Typography>No members added</Typography>
                    </Box>}
                </Stack>
            </Grid>)}
        </Grid>
    </>
}

export const LocationsTable = ({ notificationMap }) => {
    return <>
        <Typography sx={{ ...styles.groupsTable.heading }}>Locations: </Typography>
        <TableContainer sx={{ ...styles.groupsTable.tableContainer, ...globalStyles.thinScrollBar }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Location</TableCell>
                        <TableCell>Buildings</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {notificationMap?.locations?.map((location) => (
                        <TableRow key={location?.location?.id}>
                            <TableCell>{location?.location?.name}</TableCell>
                            <TableCell>{location?.buildings?.map((building) => building?.name).join(', ')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}

const styles = {
    header: {
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
        },
        actionButtonsContainer: {
            display: 'flex',
            alignItems: 'center',
            columnGap: '16px',
        }
    },
    groupsTable: {
        groupCardContainer: {
            p: 2,
            height: '370px',
        },
        heading: {
            fontWeight: 600,
            fontSize: '18px',
        },
        tableContainer: {
            height: 200,
            maxHeight: 200
        },
    }
}


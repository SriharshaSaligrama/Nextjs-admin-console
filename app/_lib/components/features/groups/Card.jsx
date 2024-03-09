'use client'

import React from 'react'
import { Box, Grid, IconButton, Paper, Stack, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material'
import globalStyles from '@/app/globalStyles'
import { DeleteOutlined, EditOutlined, GroupsOutlined } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Pagination from '../../ui/pagination'
import { groupMembersTableHeaderColumns } from '../../../constants'

const Card = (props) => {
    const router = useRouter()

    const { groupsData, totalPages, currentPage } = props

    return (
        <>
            <Grid container spacing={2}>
                {groupsData?.length > 0 ? groupsData?.map((group) => <Grid item xs={12} sm={6} md={4} key={group?.id}>
                    <Paper elevation={5} >
                        <Stack spacing={1} sx={{ ...styles.container }}>
                            <Box sx={{ ...globalStyles.justifySpaceBetweenAlignCenter }}>
                                <Typography fontSize={'24px'} noWrap>{group?.name}</Typography>
                                <Box sx={{ ...styles.actionButtonsContainer }}>
                                    <IconButton onClick={() => { router.push(`/groups/edit/${group?.id}`) }}>
                                        <EditOutlined color='primary' />
                                    </IconButton>
                                    <IconButton>
                                        <DeleteOutlined color='error' />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Typography fontSize={'16px'} noWrap>Code: {group?.code}</Typography>
                            <Typography fontSize={'12px'} noWrap>{group?.description}</Typography>
                            <Typography fontSize={'20px'}>Members:</Typography>
                            {group?.members?.length > 0 ? <TableContainer sx={{ ...styles.tableContainer, ...globalStyles.thinScrollBar }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            {groupMembersTableHeaderColumns.map((column) => (
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
                    </Paper>
                </Grid>) : <Grid item xs={12}>
                    <Box sx={{ height: '70vh', ...globalStyles.centerDiv }}>
                        <Stack sx={{ ...styles.groupNotFoundContainer }} spacing={2}>
                            <GroupsOutlined sx={{ fontSize: '80px' }} />
                            <Typography fontSize={'20px'}>{currentPage > totalPages ? `No groups found for page ${currentPage}` : 'No groups added'}</Typography>
                            <Link href={'/groups'}>Return to Groups</Link>
                        </Stack>
                    </Box>
                </Grid>}
            </Grid>
            {groupsData?.length > 0 && <Pagination totalPages={totalPages} currentPage={currentPage} returnLink='/groups' sx={{ mt: 2 }} />}
        </>
    )
}

export default Card

const styles = {
    container: {
        p: 2,
        height: '370px'
    },
    actionButtonsContainer: {
        display: 'flex',
        alignItems: 'center',
        columnGap: 1
    },
    tableContainer: {
        height: 200,
        maxHeight: 200
    },
    groupNotFoundContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
}
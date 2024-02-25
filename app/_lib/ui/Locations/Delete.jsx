'use client'

import React from 'react'
import { Box, Button, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { deleteLocationAction } from '@/app/_lib/db/locations/actions'
import globalStyles from '@/app/globalStyles'

const DeleteLocation = (props) => {
    const { deletingData, dependantBuildings } = props
    const router = useRouter()

    const handleDeleteClick = async () => {
        await deleteLocationAction({ id: deletingData?.id })
    }

    return (
        <>
            <Typography sx={{ ...styles.heading }}>Delete Dependencies</Typography>
            {
                dependantBuildings?.length > 0 ? <Stack sx={{ ...styles.dependenciesContainer }} spacing={2}>
                    <Typography><b>{deletingData.name}</b> location has <b>{dependantBuildings.length}</b> building(s):</Typography>
                    <List sx={{ ...styles.childList }}>
                        {
                            dependantBuildings.map((building) => (
                                <ListItem key={building.id} sx={{ ...styles.childListItem }}>
                                    <ListItemText primary={building.name} />
                                </ListItem>
                            ))
                        }
                    </List>
                    <Typography>Please delete all the buildings of this location before deleting this location.</Typography>
                    <Box sx={{ ...styles.actionButtonsContainer }}>
                        <Button variant='contained' color='error' sx={{ width: '100%' }} onClick={() => router.push('/locations')}>Cancel</Button>
                        <Button variant='contained' sx={{ width: '100%' }} disabled={dependantBuildings?.length} onClick={handleDeleteClick}>Delete</Button>
                    </Box>
                </Stack> :
                    <Stack sx={{ ...styles.noDependenciesContainer }} spacing={2}>
                        <Typography><b>{deletingData.name}</b> location has no building(s).</Typography>
                        <Typography>Are you sure you want to delete <b>{deletingData.name}</b> location?</Typography>
                        <Box sx={{ ...styles.actionButtonsContainer }}>
                            <Button variant='contained' color='error' sx={{ width: '100%' }} onClick={() => router.push('/locations')}>Cancel</Button>
                            <Button variant='contained' sx={{ width: '100%' }} disabled={dependantBuildings?.length} onClick={handleDeleteClick}>Delete</Button>
                        </Box>
                    </Stack>
            }

        </>
    )
}

export default DeleteLocation

const styles = {
    heading: {
        fontSize: "24px",
        fontWeight: 600,
        paddingBottom: "16px",
    },
    dependenciesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80dvh'
    },
    noDependenciesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80dvh'
    },
    childList: {
        margin: 0,
        padding: 0,
        paddingLeft: 2,
        maxHeight: '150px',
        overflow: 'auto',
        ...globalStyles.thinScrollBar
    },
    childListItem: {
        margin: 0,
        padding: 0,
        paddingBottom: 1
    },
    actionButtonsContainer: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: "16px",
    }
}
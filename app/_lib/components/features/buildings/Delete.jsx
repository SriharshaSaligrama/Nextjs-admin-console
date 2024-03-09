'use client'

import React, { useState } from 'react'
import { useFormState } from 'react-dom';
import { Box, List, ListItem, ListItemText, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { deleteBuildingAction } from '@/app/_lib/db/buildings/actions'
import globalStyles from '@/app/globalStyles'
import PageHeading from '../../ui/pageheading'
import DeleteCancelButtons from '../../ui/deletecancelbuttons'
import { submitFormData } from '../../../utils'

const DeleteBuilding = (props) => {
    const { deletingData, usersData, buildingsData } = props
    const router = useRouter()
    const [transferringBuilding, setTransferringBuilding] = useState('')
    const transferringBuildingData = buildingsData?.find((building) => building.id === transferringBuilding)
    const restOfBuildings = buildingsData?.filter((building) => building?.id !== deletingData.id)

    const handleCancelClick = () => {
        router.push('/buildings')
    }

    const initialState = { id: deletingData?.id, transferringBuildingId: transferringBuilding }

    const [state, dispatch] = useFormState(deleteBuildingAction, initialState);

    return (
        <>
            <PageHeading heading='Delete Building' />
            {
                usersData?.length > 0 ? <Stack sx={{ ...styles.dependenciesContainer }} spacing={2}>
                    <Stack spacing={2}>
                        <Typography><b>{deletingData.name} {deletingData?.location?.name && `(${deletingData?.location?.name})`}</b> building has <b>{usersData.length}</b> user(s):</Typography>
                        <List sx={{ ...styles.childList }}>
                            {
                                usersData.map((user) => (
                                    <ListItem key={user.id} sx={{ ...styles.childListItem }}>
                                        <ListItemText primary={user.fullName} />
                                    </ListItem>
                                ))
                            }
                        </List>
                        {
                            (restOfBuildings?.length > 0) ? <>
                                <Typography >If the building is being managed by any facility managers, the building will be removed from their managing buildings list.</Typography>
                                <Typography>Please select a building from the list to which you need to transfer the users to</Typography>
                                <TextField
                                    select
                                    name='building'
                                    size='small'
                                    value={transferringBuilding}
                                    onChange={(event) => setTransferringBuilding(event.target.value)}
                                >
                                    {
                                        restOfBuildings?.map((building) => (
                                            <MenuItem key={building?.id} value={building?.id}>{building?.name} {building?.location?.name && `(${building?.location?.name})`}</MenuItem>
                                        ))
                                    }
                                </TextField>
                            </> : <>
                                <Typography>There are no other buildings available to transfer the above listed users.</Typography>
                                <Typography>Please either add a new building to transfer the above listed users or delete the above listed users and then delete the <b>{deletingData.name}</b> building</Typography>
                            </>
                        }
                        {
                            transferringBuilding && <>
                                <Typography>The users listed above will be transferred to <b>{transferringBuildingData?.name} {transferringBuildingData?.location?.name && `(${transferringBuildingData?.location?.name})`}</b> building</Typography>
                                <Typography>Are you sure to delete <b>{deletingData.name} {deletingData?.location?.name && `(${deletingData?.location?.name})`}</b> building?</Typography>
                            </>
                        }
                        <Box
                            component="form"
                            action={() => submitFormData(state, dispatch)}
                            noValidate
                            autoComplete="off"
                        >
                            <DeleteCancelButtons handleCancelClick={handleCancelClick} disabled={!transferringBuilding} />
                        </Box>
                    </Stack>
                </Stack> : <Stack sx={{ ...styles.noDependenciesContainer }} spacing={2}>
                    <Typography><b>{deletingData.name} {deletingData?.location?.name && `(${deletingData?.location?.name})`}</b> building has no dependencies</Typography>
                    <Typography textAlign={'center'} maxWidth={'500px'}>If the building is being managed by any facility managers, the building will be removed from their managing buildings list.</Typography>
                    <Typography>Are you sure you want to delete <b>{deletingData.name} {deletingData?.location?.name && `(${deletingData?.location?.name})`}</b> building?</Typography>
                    <Box
                        component="form"
                        action={() => submitFormData(state, dispatch)}
                        noValidate
                        autoComplete="off"
                    >
                        <DeleteCancelButtons handleCancelClick={handleCancelClick} disabled={usersData?.length} />
                    </Box>
                </Stack>
            }
        </>
    )
}

export default DeleteBuilding

const styles = {
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
    }
}
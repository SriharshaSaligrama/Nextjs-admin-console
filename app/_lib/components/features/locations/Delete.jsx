'use client'

import React from 'react'
import { useFormState } from 'react-dom';
import { Box, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import { deleteLocationAction } from '@/app/_lib/db/locations/actions'
import globalStyles from '@/app/globalStyles'
import PageHeading from '../../ui/pageheading'
import DeleteCancelButtons from '../../ui/deletecancelbuttons'
import { submitFormData } from '../../../utils'

const DeleteLocation = (props) => {
    const { deletingData, dependantBuildings } = props

    const initialState = { id: deletingData?.id }

    const [state, dispatch] = useFormState(deleteLocationAction, initialState);

    return (
        <>
            <PageHeading heading='Delete Location' />
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
                    <DeleteCancelButtons returnLink='/locations' disabled={dependantBuildings?.length} />
                </Stack> : <Stack sx={{ ...styles.noDependenciesContainer }} spacing={2}>
                    <Typography><b>{deletingData.name}</b> location has no building(s).</Typography>
                    <Typography>Are you sure you want to delete <b>{deletingData.name}</b> location?</Typography>
                    <Box
                        component="form"
                        action={() => submitFormData(state, dispatch)}
                        noValidate
                        autoComplete="off"
                    >
                        <DeleteCancelButtons returnLink='/locations' />
                    </Box>
                </Stack>
            }
        </>
    )
}

export default DeleteLocation

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
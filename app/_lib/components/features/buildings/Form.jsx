'use client'

import React from 'react'
import { useFormState } from 'react-dom';
import { Box, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { addEditBuildingAction } from '@/app/_lib/db/buildings/actions';
import FormSubmitCancelButtons from '../../ui/formsubmitcancelbuttons';
import { submitFormData } from '../../../utils';

const BuildingsForm = (props) => {
    const { editingData, allLocations } = props

    const initialErrorState = { name: '', location: '' }

    const [state, dispatch] = useFormState(addEditBuildingAction, initialErrorState);

    return (
        <Box
            sx={{ ...styles.container }}
            component="form"
            action={(formData) => submitFormData(formData, dispatch)}
            noValidate
            autoComplete="off"
        >
            <Paper sx={{ ...styles.card }}>
                <Typography sx={{ ...styles.title }}>{editingData?.id ? 'Update building' : 'Add a building'}</Typography>
                <TextField
                    name='id'
                    sx={{ display: 'none' }}
                    defaultValue={editingData?.id}
                />
                <TextField
                    required
                    label='Building Name'
                    name='name'
                    defaultValue={editingData?.name}
                    error={state?.name?.length > 0}
                    helperText={state?.name || ''}
                    size='small'
                />
                <TextField
                    label={'Location Name'}
                    select
                    name='location'
                    defaultValue={editingData?.location?.id}
                    error={state?.location?.length > 0}
                    helperText={state?.location || ''}
                    size='small'
                    sx={{ display: editingData?.id && 'none' }}
                >
                    {allLocations?.map((location) => (
                        <MenuItem key={location?.id} value={location?.id}>
                            {location?.name}
                        </MenuItem>
                    ))}
                </TextField>
                {editingData?.location?.id && (
                    <Typography sx={{ textAlign: 'center' }}><b>Location:</b> {editingData?.location?.name}</Typography>
                )}
                <FormSubmitCancelButtons
                    returnLink='/buildings'
                    submitText={editingData?.id ? 'Update Building' : 'Create Building'}
                    submitPendingText={editingData?.id ? `Updating Building...` : `Creating Building...`}
                />
            </Paper>
        </Box>
    )
}

export default BuildingsForm

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    },
    card: {
        padding: '32px',
        borderRadius: '8px',
        display: 'flex',
        width: '30%',
        flexDirection: 'column',
        rowGap: '16px',
        boxShadow: 24,
    },
    title: {
        fontSize: '26px',
        fontWeight: 600,
        textAlign: 'center',
    }
}
'use client'

import React from 'react'
import { useFormState } from 'react-dom';
import { Box, Paper, TextField, Typography } from '@mui/material'
import { addEditLocationAction } from '@/app/_lib/db/locations/actions';
import FormSubmitCancelButtons from '../../ui/formsubmitcancelbuttons';
import { submitFormData } from '../../../utils';

const LocationsForm = (props) => {
    const { editingData } = props

    const initialErrorState = { name: '' }

    const [state, dispatch] = useFormState(addEditLocationAction, initialErrorState);

    return (
        <Box
            sx={{ ...styles.container }}
            component="form"
            action={(formData) => submitFormData(formData, dispatch)}
            noValidate
            autoComplete="off"
        >
            <Paper sx={{ ...styles.card }}>
                <Typography sx={{ ...styles.title }}>
                    {editingData?.id ? 'Update location' : 'Add a location'}
                </Typography>
                <TextField
                    name='id'
                    sx={{ display: 'none' }}
                    defaultValue={editingData?.id}
                />
                <TextField
                    required
                    label='Location Name'
                    name='name'
                    defaultValue={editingData?.name}
                    error={state?.name?.length > 0}
                    helperText={state?.name || ''}
                    size='small'
                />
                <FormSubmitCancelButtons
                    returnLink='/locations'
                    submitText={editingData?.id ? `Update Location` : `Create Location`}
                    submitPendingText={editingData?.id ? `Updating Location...` : `Creating Location...`}
                />
            </Paper>
        </Box>
    )
}

export default LocationsForm

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
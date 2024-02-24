'use client'

import React from 'react'
import { useFormState } from 'react-dom';
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { addLocationAction, editLocationAction } from '@/app/lib/locations/actions';
import { useRouter } from 'next/navigation';

const LocationsForm = (props) => {
    const { editingData } = props

    const router = useRouter()

    const initialErrorState = { name: '' }

    const [state, dispatch] = useFormState(editingData?.id ? editLocationAction : addLocationAction, initialErrorState);

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(new FormData(event.target))
    }

    const handleCancelClick = () => {
        router.push('/locations')
    }

    return (
        <Box
            sx={{ ...styles.container }}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Paper sx={{ ...styles.card }}>
                <Typography sx={{ ...styles.title }}>{editingData?.id ? 'Update location' : 'Add a location'}</Typography>
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
                <Box sx={{ ...styles.buttonsContainer }}>
                    <Button sx={{ ...styles.buttons }} variant='contained' color='error' onClick={handleCancelClick}>Cancel</Button>
                    <Button sx={{ ...styles.buttons }} variant='contained' type="submit">{editingData?.id ? 'Update' : 'Create'} Location</Button>
                </Box>
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
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'center',
        columnGap: '16px',
    },
    buttons: {
        width: '50%',
    },
}
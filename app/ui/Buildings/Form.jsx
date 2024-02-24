'use client'

import React from 'react'
import { useFormState } from 'react-dom';
import { Box, Button, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';
import { addBuildingAction, editBuildingAction } from '@/app/lib/buildings/actions';

const BuildingsForm = (props) => {
    const { editingData, allLocations } = props

    const router = useRouter()

    const initialErrorState = { name: '', location: '' }

    const [state, dispatch] = useFormState(editingData?.id ? editBuildingAction : addBuildingAction, initialErrorState);

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(new FormData(event.target))
    }

    const handleCancelClick = () => {
        router.push('/buildings')
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
                <Box sx={{ ...styles.buttonsContainer }}>
                    <Button sx={{ ...styles.buttons }} variant='contained' color='error' onClick={handleCancelClick}>Cancel</Button>
                    <Button sx={{ ...styles.buttons }} variant='contained' type="submit">{editingData?.id ? 'Update' : 'Create'} Building</Button>
                </Box>
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
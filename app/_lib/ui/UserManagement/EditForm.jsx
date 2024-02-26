'use client'

import React from 'react'
import { useFormState } from 'react-dom';
import { Box, MenuItem, Stack, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import FormSubmitCancelButtons from '../FormSubmitCancelButtons'
import PageHeading from '../PageHeading'
import { editUserAction } from '../../db/user/actions';

const EditUserForm = (props) => {
    const { allBuildings, allDepartments, editingData } = props

    const router = useRouter()

    const initialErrorState = { fullName: '', role: '', buildingAssignedTo: '', managingBuildings: '', departmentAssignedTo: '' }

    const [state, dispatch] = useFormState(editUserAction, initialErrorState);

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(new FormData(event.target))
    }

    const handleCancelClick = () => {
        router.push('/users')
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Stack spacing={2}>
                <PageHeading heading='Update User' />
                <TextField
                    name='id'
                    defaultValue={editingData?.id}
                    sx={{ display: 'none' }}
                />
                <TextField
                    required
                    label='Name'
                    name='fullName'
                    defaultValue={editingData?.fullName}
                    error={state?.fullName?.length > 0}
                    helperText={state?.fullName || ''}
                />
                <TextField
                    required
                    label='Role'
                    select
                    name='role'
                    defaultValue={editingData?.role}
                    error={state?.role?.length > 0}
                    helperText={state?.role || ''}
                >
                    {['admin', 'employee', 'facility manager']?.map((role) => (
                        <MenuItem key={role} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label='Building'
                    select
                    required
                    name='buildingAssignedTo'
                    defaultValue={editingData?.buildingAssignedTo?.id}
                    error={state?.buildingAssignedTo?.length > 0}
                    helperText={state?.buildingAssignedTo || ''}
                >
                    {allBuildings?.map((building) => (
                        <MenuItem key={building?.id} value={building?.id}>
                            {building?.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label='Buildings Managing'
                    name='managingBuildings'
                    select
                    SelectProps={{
                        multiple: true
                    }}
                    defaultValue={editingData?.managingBuildings || []}
                    error={state?.managingBuildings?.length > 0}
                    helperText={state?.managingBuildings || ''}
                >
                    {allBuildings?.map((building) => (
                        <MenuItem key={building?.id} value={building?.id}>
                            {building?.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label='Department'
                    select
                    name='departmentAssignedTo'
                    defaultValue={editingData?.departmentAssignedTo?.id || 'selectDepartment'}
                    error={state?.departmentAssignedTo?.length > 0}
                    helperText={state?.departmentAssignedTo || ''}
                >
                    <MenuItem value='selectDepartment'>Select Department</MenuItem>
                    {allDepartments?.map((department) => (
                        <MenuItem key={department?.id} value={department?.id}>
                            {department?.name}
                        </MenuItem>
                    ))}
                </TextField>
                <FormSubmitCancelButtons
                    handleCancelClick={handleCancelClick}
                    submitText={`Update User`}
                />
            </Stack>
        </Box>
    )
}

export default EditUserForm
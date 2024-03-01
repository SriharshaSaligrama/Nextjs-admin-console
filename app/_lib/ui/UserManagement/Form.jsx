'use client'

import React from 'react'
import { useFormState } from 'react-dom';
import { Box, MenuItem, Stack, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import FormSubmitCancelButtons from '../FormSubmitCancelButtons'
import PageHeading from '../PageHeading'
import { addUserAction } from '../../db/user/actions';
import { userRoles } from '../../constants';
import { submitFormData } from '../../db/utils';
import PasswordInput from '../PasswordInput';

const UserForm = (props) => {
    const { allBuildings, allDepartments } = props

    const router = useRouter()

    const initialErrorState = {
        fullName: '',
        email: '',
        password: '',
        role: '',
        buildingAssignedTo: '',
        managingBuildings: '',
        departmentAssignedTo: ''
    }

    const [state, dispatch] = useFormState(addUserAction, initialErrorState);

    const handleCancelClick = () => {
        router.push('/users')
    }

    return (
        <Box
            component="form"
            action={(formData) => submitFormData(formData, dispatch)}
            noValidate
            autoComplete="off"
        >
            <Stack spacing={2}>
                <PageHeading heading='Add User' />
                <TextField
                    required
                    label='Name'
                    name='fullName'
                    error={state?.fullName?.length > 0}
                    helperText={state?.fullName || ''}
                />
                <TextField
                    required
                    type='email'
                    label='Email'
                    name='email'
                    error={state?.email?.length > 0}
                    helperText={state?.email || ''}
                />
                <PasswordInput error={state?.password?.length > 0} helperText={state?.password} />
                <TextField
                    required
                    label='Role'
                    select
                    name='role'
                    error={state?.role?.length > 0}
                    helperText={state?.role || ''}
                >
                    {userRoles?.map((role) => (
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
                    defaultValue={[]}
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
                    submitText={`Create User`}
                    submitPendingText={`Creating User...`}
                />
            </Stack>
        </Box>
    )
}

export default UserForm
'use client'

import React, { useState } from 'react'
import { useFormState } from 'react-dom';
import { Box, IconButton, InputAdornment, MenuItem, Stack, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import FormSubmitCancelButtons from '../FormSubmitCancelButtons'
import PageHeading from '../PageHeading'
import { addUserAction } from '../../db/user/actions';
import { userRoles } from '../../constants';

const UserForm = (props) => {
    const { allBuildings, allDepartments } = props

    const router = useRouter()

    const initialErrorState = { fullName: '', email: '', password: '', role: '', buildingAssignedTo: '', managingBuildings: '', departmentAssignedTo: '' }

    const [state, dispatch] = useFormState(addUserAction, initialErrorState);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                <TextField
                    required
                    label='Password'
                    name='password'
                    error={state?.password?.length > 0}
                    helperText={state?.password || ''}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
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
                />
            </Stack>
        </Box>
    )
}

export default UserForm
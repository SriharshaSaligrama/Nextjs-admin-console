'use client'

import React, { useState } from 'react'
import { Box, IconButton, InputAdornment, MenuItem, Stack, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import FormSubmitCancelButtons from '../FormSubmitCancelButtons'
import PageHeading from '../PageHeading'

const UserForm = () => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(new FormData(event.target))
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
                // error={state?.name?.length > 0}
                // helperText={state?.name || ''}
                />
                <TextField
                    required
                    label='Email'
                    name='email'
                // error={state?.code?.length > 0}
                // helperText={state?.code || ''}
                />
                <TextField
                    required
                    label='Password'
                    name='password'
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
                    name='buildingAssignedTo'
                >
                    {['admin', 'employee', 'facility manager']?.map((role) => (
                        <MenuItem key={role} value={role}>
                            {role}
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
                >
                    {['admin', 'employee', 'facility manager']?.map((role) => (
                        <MenuItem key={role} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label='Department'
                    select
                    name='departmentAssignedTo'
                >
                    {['admin', 'employee', 'facility manager']?.map((role) => (
                        <MenuItem key={role} value={role}>
                            {role}
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
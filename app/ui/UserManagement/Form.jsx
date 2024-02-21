'use client'

import React, { useState } from 'react'
import { Box, Button, IconButton, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Visibility, VisibilityOff } from '@mui/icons-material'

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
                <Typography sx={{ ...styles.heading }}>Add User</Typography>
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
                <Box sx={{ ...styles.buttonsContainer }}>
                    <Button sx={{ ...styles.buttons }} variant='contained' color='error' onClick={handleCancelClick}>Cancel</Button>
                    <Button sx={{ ...styles.buttons }} variant='contained' type="submit">Create User</Button>
                </Box>
            </Stack>
        </Box>
    )
}

export default UserForm

const styles = {
    heading: {
        fontSize: "24px",
        fontWeight: 600,
        paddingBottom: "16px",
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
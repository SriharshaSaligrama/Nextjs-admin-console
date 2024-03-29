'use client'

import React from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material'
import PasswordInput from '../passwordinput'
import { submitFormData } from '@/app/_lib/utils'
import { authenticate } from '@/app/_lib/db/user/actions';

const LoginForm = () => {
    const [state, dispatch] = useFormState(authenticate, { email: '', password: '', error: '' });

    return (
        <Container maxWidth='xs'>
            <Box
                component="form"
                action={(formData) => submitFormData(formData, dispatch)}
                noValidate
                autoComplete="off"
            >
                <Paper >
                    <Stack spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', height: '100vh', p: 3, m: '0 auto' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '24px', alignSelf: 'start' }}>Login</Typography>
                        <TextField
                            label='Email'
                            name='email'
                            fullWidth
                        />
                        <PasswordInput fullWidth />
                        {state?.error && <Typography color={'error'} fontSize={'12px'}>{state?.error?.message}</Typography>}
                        <LoginButton />
                    </Stack>
                </Paper>
            </Box>
        </Container>
    )
}

export default LoginForm

const LoginButton = () => {
    const { pending } = useFormStatus();

    return (<Button type='submit' variant='contained' fullWidth disabled={pending}>Login</Button>)

}
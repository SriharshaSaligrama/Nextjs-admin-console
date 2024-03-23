'use client'

import React from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material'
import PasswordInput from '../passwordinput'
import { authenticate } from '@/app/_lib/db/user/actions';

const LoginForm = () => {
    const [code, action] = useFormState(authenticate, undefined);

    return (
        <Container maxWidth='xs'>
            <Box
                component="form"
                action={action}
                noValidate
                autoComplete="off"
            >
                <Paper >
                    <Stack spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', height: '100vh', p: 3, m: '0 auto' }}>
                        <TextField
                            label='Email'
                            name='email'
                            fullWidth
                        />
                        <PasswordInput fullWidth />
                        {code === 'CredentialSignin' && <Typography color={'error'} fontSize={'12px'}>Invalid credentials!</Typography>}
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
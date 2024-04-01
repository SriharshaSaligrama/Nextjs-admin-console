import React from 'react'
import { InputAdornment, IconButton, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import usePasswordInput from './hook';

const PasswordInput = (props) => {
    const { name, error, helperText, fullWidth } = props

    const { showPassword, handleClickShowPassword, handleMouseDownPassword } = usePasswordInput()

    return (
        <TextField
            required
            label='Password'
            name={name || 'password'}
            error={!!error}
            helperText={helperText || ''}
            type={showPassword ? 'text' : 'password'}
            fullWidth={!!fullWidth}
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
    )
}

export default PasswordInput
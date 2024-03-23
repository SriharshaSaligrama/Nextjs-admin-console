import React, { useState } from 'react'
import { InputAdornment, IconButton, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordInput = (props) => {
    const { name, error, helperText, fullWidth } = props

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
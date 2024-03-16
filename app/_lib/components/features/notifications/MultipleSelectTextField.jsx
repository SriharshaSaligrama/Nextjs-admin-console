import React from 'react'
import { Checkbox, ListItemText, MenuItem, TextField } from '@mui/material'

const MultipleSelectTextField = (props) => {
    const {
        label,
        value,
        onChange,
        error,
        helperText,
        options,
        disabled
    } = props

    return (
        <TextField
            select
            SelectProps={{
                multiple: true,
                renderValue: (selected) => {
                    const selectedNames = selected?.map(selectedId => options?.find(option => option?.id === selectedId)?.name);
                    return selectedNames?.join(', ');
                }
            }}
            label={label}
            value={value || []}
            onChange={onChange || (() => { })}
            error={!!error}
            helperText={helperText || ''}
            disabled={!!disabled}
        >
            {options?.map((option) => (
                <MenuItem key={option?.id} value={option?.id}>
                    <Checkbox checked={value?.indexOf(option?.id) > -1} />
                    <ListItemText primary={option?.name} />
                </MenuItem>
            ))}
        </TextField>
    )
}

export default MultipleSelectTextField
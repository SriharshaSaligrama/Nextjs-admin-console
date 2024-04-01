'use client'

import React from 'react'
import { InputAdornment, TextField, Tooltip } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
import { useSearchInput } from './hook'

const SearchInput = (props) => {
    const { placeholder } = props

    const { handleSearch, searchParams } = useSearchInput()

    return (
        <TextField
            size='small'
            sx={{ width: { md: '420px' } }}
            placeholder={placeholder}
            onChange={(e) => {
                handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get('query')?.toString()}
            InputProps={{
                endAdornment: (
                    <Tooltip title={placeholder}>
                        <InputAdornment position="end">
                            <SearchOutlined />
                        </InputAdornment>
                    </Tooltip>
                ),
            }}
        />
    )
}

export default SearchInput
'use client'

import React from 'react'
import { InputAdornment, TextField, Tooltip } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { debounce } from '../../../utils';

const SearchInput = (props) => {
    const { placeholder } = props

    const searchParams = useSearchParams();

    const pathname = usePathname();

    const { replace } = useRouter();

    const handleSearch = debounce((term) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 500);

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
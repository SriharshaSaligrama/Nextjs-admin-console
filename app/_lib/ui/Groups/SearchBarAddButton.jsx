'use client'

import React from 'react'
import SearchInput from '../SearchInput'
import { Box, Button } from '@mui/material'
import { useRouter } from 'next/navigation'

const SearchBarAddButton = (props) => {
    const { groupsData } = props

    const router = useRouter()

    return (
        <Box sx={{ ...styles.searchBarAddButton }}>
            {groupsData?.length > 0 && <SearchInput placeholder="Search groups by name, code or member's email" />}
            <Button
                variant='contained'
                onClick={() => router.push(`/groups/add`)}
            >
                Add New Group
            </Button>
        </Box>
    )
}

export default SearchBarAddButton

const styles = {
    searchBarAddButton: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
    }
}
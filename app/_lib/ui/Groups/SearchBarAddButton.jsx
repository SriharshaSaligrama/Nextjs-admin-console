'use client'

import React from 'react'
import SearchInput from '../SearchInput'
import { Box, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import Pagination from '../Pagination'

const SearchBarAddButton = (props) => {
    const { groupsData, totalPages, currentPage } = props

    const router = useRouter()

    return (
        groupsData?.length > 0 && <Box sx={{ ...styles.searchBarAddButton }}>
            <SearchInput placeholder="Search groups by name, code or member's email" />
            <Pagination totalPages={totalPages} currentPage={currentPage} />
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
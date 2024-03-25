'use client'

import React from 'react'
import SearchInput from '../../ui/searchinput'
import { Box, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import Pagination from '../../ui/pagination'

const SearchBarAddButton = (props) => {
    const { groupsData, totalPages, currentPage } = props

    const router = useRouter()

    return (
        <Box sx={{ ...styles.searchBarAddButton, justifyContent: groupsData?.length > 0 ? 'space-between' : 'flex-end' }}>
            {
                groupsData?.length > 0 && <>
                    <SearchInput placeholder="Search groups by name, code or member's email" />
                    <Pagination totalPages={totalPages} currentPage={currentPage} returnLink='/groups' />
                </>
            }
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
        alignItems: 'center',
        mb: 2,
    }
}
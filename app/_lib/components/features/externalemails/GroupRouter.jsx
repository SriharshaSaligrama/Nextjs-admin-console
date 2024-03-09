'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { Box, Chip } from '@mui/material'

const GroupRouter = (props) => {
    const { groups } = props

    const router = useRouter()

    return (
        groups?.map((group) => (
            <Box key={group.id} >
                <Chip
                    variant="outlined"
                    label={group.name}
                    color='primary'
                    onClick={() => { router.push(`/groups/${group.id}`) }}
                    sx={{ ...styles.chip }}
                />
            </Box>
        ))
    )
}

export default GroupRouter

const styles = {
    chip: {
        mr: '4px'
    }
}
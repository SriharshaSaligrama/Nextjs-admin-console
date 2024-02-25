'use client'

import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { deleteBuildingAction } from '@/app/_lib/db/buildings/actions'

const DeleteBuilding = (props) => {
    const { deletingData } = props
    const router = useRouter()

    const handleDeleteClick = async () => {
        await deleteBuildingAction({ id: deletingData?.id })
    }

    return (
        <>
            <Typography sx={{ ...styles.heading }}>Delete Dependencies</Typography>
            <Box sx={{ ...styles.actionButtonsContainer }}>
                <Button variant='contained' color='error' sx={{ width: '100%' }} onClick={() => router.push('/buildings')}>Cancel</Button>
                <Button variant='contained' sx={{ width: '100%' }} disabled={true} onClick={handleDeleteClick}>Delete</Button>
            </Box>
        </>
    )
}

export default DeleteBuilding

const styles = {
    heading: {
        fontSize: "24px",
        fontWeight: 600,
        paddingBottom: "16px",
    },
    dependenciesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80dvh'
    },
    noDependenciesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80dvh'
    },
    actionButtonsContainer: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: "16px",
    }
}
import React from 'react'
import { Box, Skeleton } from '@mui/material'

const LocationsFormSkeleton = () => {
    return (
        <Box sx={{ ...styles.container }}>
            <Box sx={{ ...styles.card }}>
                <Skeleton variant="rectangular" height={'220px'} sx={{ ...styles.skeleton }} />
            </Box>
        </Box>
    )
}

export default LocationsFormSkeleton

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    },
    card: {
        borderRadius: '8px',
        display: 'flex',
        width: '30%',
        flexDirection: 'column',
        rowGap: '16px',
    },
    skeleton: {
        borderRadius: '8px',
    }
}
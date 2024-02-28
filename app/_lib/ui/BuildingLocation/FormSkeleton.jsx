import React from 'react'
import { Box, Skeleton } from '@mui/material'

const BuildingsLocationsFormSkeleton = (props) => {
    const { height } = props

    return (
        <Box sx={{ ...styles.container }}>
            <Box sx={{ ...styles.card }}>
                <Skeleton
                    variant="rectangular"
                    sx={{ ...styles.skeleton, height: height || '220px' }}
                />
            </Box>
        </Box>
    )
}

export default BuildingsLocationsFormSkeleton

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
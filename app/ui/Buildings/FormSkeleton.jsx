import React from 'react'
import { Box, Skeleton } from '@mui/material'

const BuildingsFormSkeleton = ({ height }) => {
    return (
        <Box sx={{ ...styles.container }}>
            <Box sx={{ ...styles.card }}>
                <Skeleton variant="rectangular" height={height || '260px'} sx={{ ...styles.skeleton }} />
            </Box>
        </Box>
    )
}

export default BuildingsFormSkeleton

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
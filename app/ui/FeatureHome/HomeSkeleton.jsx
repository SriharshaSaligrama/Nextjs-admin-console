import React from 'react'
import { Skeleton, Stack } from '@mui/material'

const HomeSkeleton = () => {
    return (
        <>
            <Stack spacing={1}>
                <Skeleton variant="text" sx={{ ...styles.title }} />
                <Skeleton variant="text" sx={{ ...styles.addButton }} />
                <Skeleton variant="rectangular" height={'70vh'} />
            </Stack>
        </>
    )
}

export default HomeSkeleton

const styles = {
    title: {
        fontSize: '36px',
        width: '210px',
    },
    addButton: {
        fontSize: '36px',
        alignSelf: 'flex-end',
        width: '210px',
    },
}
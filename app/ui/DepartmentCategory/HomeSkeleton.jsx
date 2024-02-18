import React from 'react'
import { Skeleton, Stack } from '@mui/material'

const HomeSkeleton = () => {
    return (
        <>
            <Stack spacing={1}>
                <Skeleton variant="text" width={'210px'} sx={{ fontSize: '36px', }} />
                <Skeleton variant="text" width={'210px'} sx={{ fontSize: '36px', alignSelf: 'flex-end' }} />
                <Skeleton variant="rectangular" height={'70vh'} />
            </Stack>
        </>
    )
}

export default HomeSkeleton
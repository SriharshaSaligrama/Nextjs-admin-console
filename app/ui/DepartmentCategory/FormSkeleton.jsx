import React from 'react'
import { Skeleton, Stack } from '@mui/material'

const FormSkeleton = () => {
    return (
        <>
            <Stack spacing={2}>
                <Skeleton variant="text" width={'210px'} sx={{ fontSize: '36px', }} />
                <Skeleton variant="rectangular" height={60} />
                <Skeleton variant="rectangular" height={60} />
                <Skeleton variant="rectangular" height={120} />
                <Skeleton variant="rectangular" height={60} />
            </Stack>
        </>
    )
}

export default FormSkeleton
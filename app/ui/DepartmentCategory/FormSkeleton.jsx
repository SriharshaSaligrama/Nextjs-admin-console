import React from 'react'
import { Skeleton, Stack } from '@mui/material'

const FormSkeleton = () => {
    return (
        <>
            <Stack spacing={2}>
                <Skeleton variant="text" width={'210px'} sx={{ fontSize: '36px', }} />
                <Skeleton variant="rectangular" height={'8vh'} />
                <Skeleton variant="rectangular" height={'8vh'} />
                <Skeleton variant="rectangular" height={'16vh'} />
                <Skeleton variant="rectangular" height={'8vh'} />
            </Stack>
        </>
    )
}

export default FormSkeleton
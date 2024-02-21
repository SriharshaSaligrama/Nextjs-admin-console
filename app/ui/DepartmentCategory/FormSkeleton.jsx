import React from 'react'
import { Skeleton, Stack } from '@mui/material'

const FormSkeleton = () => {
    return (
        <>
            <Stack spacing={2}>
                <Skeleton variant="text" sx={{ ...styles.title }} />
                <Skeleton variant="rectangular" height={'8vh'} />
                <Skeleton variant="rectangular" height={'8vh'} />
                <Skeleton variant="rectangular" height={'16vh'} />
                <Skeleton variant="rectangular" height={'8vh'} />
            </Stack>
        </>
    )
}

export default FormSkeleton

const styles = {
    title: {
        fontSize: '36px',
        width: '210px',
    }
}
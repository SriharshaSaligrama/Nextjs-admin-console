import React from 'react'
import { Skeleton, Stack } from '@mui/material'

const UsersFormSkeleton = ({ numberOfInputs }) => {
    return (
        <>
            <Stack spacing={2}>
                <Skeleton variant="text" sx={{ ...styles.title }} />
                {
                    Array(numberOfInputs || 1).fill(0).map((_, index) => <Skeleton
                        key={index}
                        variant="rectangular"
                        sx={{ ...styles.input }}
                    />)
                }
            </Stack>
        </>
    )
}

export default UsersFormSkeleton

const styles = {
    title: {
        fontSize: '36px',
        width: '210px',
    },
    input: {
        borderRadius: '4px',
        height: '8vh'
    }
}
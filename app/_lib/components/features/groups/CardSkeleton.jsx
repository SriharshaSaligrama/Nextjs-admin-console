import React from 'react'
import { Grid, Skeleton, Stack } from '@mui/material'

const CardSkeleton = ({ cardItemsLength, hideSearchAddButton }) => {
    return (
        <Stack spacing={1}>
            <Skeleton variant="text" sx={{ ...styles.title }} />
            {!hideSearchAddButton && <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Skeleton variant="text" sx={{ ...styles.searchInput }} />
                <Skeleton variant="text" sx={{ ...styles.addButton }} />
            </Stack>}
            <Grid container gap={2} >
                {new Array(cardItemsLength || 6).fill(undefined).map((_, index) => (
                    <Grid key={index} item xs={12} sm={6} md={3.9}>
                        <Skeleton variant="rectangular" sx={{ ...styles.card }} />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    )
}

export default CardSkeleton

const styles = {
    title: {
        fontSize: '36px',
        width: '210px',
    },
    searchInput: {
        fontSize: '36px',
        width: '400px',
    },
    addButton: {
        fontSize: '36px',
        width: '210px',
    },
    card: {
        borderRadius: '4px',
        height: '350px'
    }
}
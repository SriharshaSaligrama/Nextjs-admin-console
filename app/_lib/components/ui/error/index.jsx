import React from 'react'
import { Button, Stack, Typography } from '@mui/material'

const DefaultError = (props) => {
    const { error, reset } = props

    return (
        <Stack sx={{ ...styles.container }} spacing={2}>
            <Typography>Oops..., Something went wrong!</Typography>
            {error?.message && <Typography>{error?.message}</Typography>}
            <Button onClick={() => reset()}>Try again</Button>      {/* Attempt to recover by trying to re-render the segment */}
        </Stack>
    )
}

export default DefaultError

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    },
}
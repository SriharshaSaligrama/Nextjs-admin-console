import React from 'react'
import Link from 'next/link'
import { Stack, Typography } from '@mui/material'
import { SentimentVeryDissatisfiedOutlined } from '@mui/icons-material'

const DefaultNotFound = ({ entity, returnLink, returnPageName }) => {
    return (
        <Stack sx={{ justifyContent: 'center', alignItems: 'center', height: '80vh' }} spacing={2}>
            <SentimentVeryDissatisfiedOutlined sx={{ fontSize: '100px' }} />
            <Typography sx={{ fontSize: '36px', fontWeight: 600, textAlign: 'center' }}>404 Not Found</Typography>
            <Typography sx={{ fontSize: '18px', fontWeight: 500, textAlign: 'center' }}>Unable to find the {entity} for the given id</Typography>
            <Link href={returnLink}>Return to {returnPageName}</Link>
        </Stack>
    )
}

export default DefaultNotFound
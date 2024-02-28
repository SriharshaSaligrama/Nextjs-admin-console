import React from 'react'
import Link from 'next/link'
import { Stack, Typography } from '@mui/material'
import { SentimentVeryDissatisfiedOutlined } from '@mui/icons-material'

const DefaultNotFound = ({ entity, returnLink, returnPageName }) => {
    return (
        <Stack sx={{ ...styles.container }} spacing={2}>
            <SentimentVeryDissatisfiedOutlined sx={{ ...styles.icon }} />
            <Typography sx={{ ...styles.notFoundTypography }}>404 Not Found</Typography>
            <Typography sx={{ ...styles.returnTypography }}>
                Unable to find the {entity} for the given id
            </Typography>
            <Link href={returnLink}>Return to {returnPageName}</Link>
        </Stack>
    )
}

export default DefaultNotFound

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    },
    icon: {
        fontSize: '100px',
    },
    notFoundTypography: {
        fontSize: '36px',
        fontWeight: 600,
        textAlign: 'center',
    },
    returnTypography: {
        fontSize: '18px',
        fontWeight: 500,
        textAlign: 'center',
    }
}
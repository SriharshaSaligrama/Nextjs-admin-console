import React from 'react'
import { Typography } from '@mui/material'

const PageHeading = (props) => {
    const { heading } = props

    return (
        <Typography sx={{ ...styles.heading }}>{heading}</Typography>
    )
}

export default PageHeading

const styles = {
    heading: {
        fontSize: "24px",
        fontWeight: 600,
        paddingBottom: "16px",
    }
}
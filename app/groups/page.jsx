import React from 'react'
import { unstable_noStore as noStore } from 'next/cache';
import Home from '../_lib/ui/FeatureHome';
import { Typography } from '@mui/material';

export const metadata = {
    title: 'Groups',
}

const Groups = () => {
    noStore()

    return (
        <>
            <Home />
            <Typography>Groups Page</Typography>
        </>
    )
}

export default Groups
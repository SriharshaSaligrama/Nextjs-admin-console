import React from 'react'
import { unstable_noStore as noStore } from 'next/cache';
import Home from '../_lib/ui/FeatureHome';

export const metadata = {
    title: 'Groups',
}

const Groups = () => {
    noStore()

    return (
        <Home />
    )
}

export default Groups
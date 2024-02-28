import React from 'react'
import Home from '../_lib/ui/FeatureHome'
import { getBuildings } from '../_lib/db/buildings/controller'
import { unstable_noStore as noStore } from 'next/cache';

const BuildingsPage = async () => {
    noStore();
    const data = await getBuildings()

    return (
        <Home data={data || []} />
    )
}

export default BuildingsPage
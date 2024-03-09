import React from 'react'
import Home from '../_lib/components/features/featurehome'
import { getLocations } from '../_lib/db/locations/controller'
import { unstable_noStore as noStore } from 'next/cache';

export const metadata = {
    title: 'Locations',
}

const LocationsPage = async () => {
    noStore()
    const data = await getLocations()

    return (
        <Home data={data || []} />
    )
}

export default LocationsPage
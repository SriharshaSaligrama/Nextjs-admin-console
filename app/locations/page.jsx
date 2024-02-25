import React from 'react'
import Home from '../_lib/ui/FeatureHome'
import { getLocations } from '../_lib/db/locations/controller'

const LocationsPage = async () => {
    const data = await getLocations()

    return (
        <Home data={data || []} />
    )
}

export default LocationsPage
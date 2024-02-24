import React from 'react'
import Home from '../ui/FeatureHome'
import { getLocations } from '../lib/locations/controller'

const LocationsPage = async () => {
    const data = await getLocations()

    return (
        <Home data={data || []} />
    )
}

export default LocationsPage
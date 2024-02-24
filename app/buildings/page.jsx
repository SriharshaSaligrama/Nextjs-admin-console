import React from 'react'
import Home from '../ui/FeatureHome'
import { getBuildings } from '../lib/buildings/controller'

const BuildingsPage = async () => {
    const data = await getBuildings()

    return (
        <Home data={data || []} />
    )
}

export default BuildingsPage
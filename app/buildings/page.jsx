import React from 'react'
import Home from '../_lib/ui/FeatureHome'
import { getBuildings } from '../_lib/db/buildings/controller'

const BuildingsPage = async () => {
    const data = await getBuildings()

    return (
        <Home data={data || []} />
    )
}

export default BuildingsPage
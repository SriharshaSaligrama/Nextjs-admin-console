import { getLocations } from '@/app/_lib/db/locations/controller'
import BuildingsForm from '@/app/_lib/ui/Buildings/Form'
import React from 'react'

const AddBuilding = async () => {
    const allLocations = await getLocations()

    return (
        <BuildingsForm allLocations={allLocations} />
    )
}

export default AddBuilding
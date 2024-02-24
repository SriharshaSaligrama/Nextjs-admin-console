import { getLocations } from '@/app/lib/locations/controller'
import BuildingsForm from '@/app/ui/Buildings/Form'
import React from 'react'

const AddBuilding = async () => {
    const allLocations = await getLocations()

    return (
        <BuildingsForm allLocations={allLocations} />
    )
}

export default AddBuilding
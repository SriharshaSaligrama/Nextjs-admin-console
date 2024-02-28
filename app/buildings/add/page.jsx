import { getLocations } from '@/app/_lib/db/locations/controller'
import BuildingsForm from '@/app/_lib/ui/Buildings/Form'
import React from 'react'
import { unstable_noStore as noStore } from 'next/cache';

export const metadata = {
    title: 'Add Building',
}

const AddBuilding = async () => {
    noStore()
    const allLocations = await getLocations()

    return (
        <BuildingsForm allLocations={allLocations} />
    )
}

export default AddBuilding
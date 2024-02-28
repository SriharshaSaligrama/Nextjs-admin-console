import React from 'react'
import { notFound } from 'next/navigation'
import { getLocation } from '@/app/_lib/db/locations/controller'
import DeleteLocation from '@/app/_lib/ui/Locations/Delete'
import { getBuildingsByLocationId } from '@/app/_lib/db/buildings/controller'

export const metadata = {
    title: 'Delete Location',
}

const DeleteDependencies = async (props) => {
    const { params } = props
    const id = params.id
    const deletingLocation = await getLocation(id)
    if (!deletingLocation) {
        notFound()
    }
    const dependantBuildings = await getBuildingsByLocationId(id)

    return (
        <DeleteLocation deletingData={deletingLocation || {}} dependantBuildings={dependantBuildings} />
    )
}

export default DeleteDependencies
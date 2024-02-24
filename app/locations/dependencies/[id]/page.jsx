import React from 'react'
import { notFound } from 'next/navigation'
import { getLocation } from '@/app/lib/locations/controller'
import DeleteLocation from '@/app/ui/Locations/Delete'
import { getBuildingsByLocationId } from '@/app/lib/buildings/controller'

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
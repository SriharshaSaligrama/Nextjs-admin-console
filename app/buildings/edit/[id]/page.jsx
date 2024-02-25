import React from 'react'
import { getBuilding } from '@/app/_lib/db/buildings/controller'
import { notFound } from 'next/navigation'
import BuildingsForm from '@/app/_lib/ui/Buildings/Form'
import { getLocations } from '@/app/_lib/db/locations/controller'

const EditBuilding = async (props) => {
    const { params } = props
    const id = params.id
    const editingBuilding = await getBuilding(id)
    if (!editingBuilding) {
        notFound()
    }
    const allLocations = await getLocations()

    return (
        <BuildingsForm editingData={editingBuilding} allLocations={allLocations} />
    )
}

export default EditBuilding
import React from 'react'
import { getBuilding } from '@/app/lib/buildings/controller'
import { notFound } from 'next/navigation'
import BuildingsForm from '@/app/ui/Buildings/Form'
import { getLocations } from '@/app/lib/locations/controller'

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
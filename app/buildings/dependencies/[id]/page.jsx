import React from 'react'
import { notFound } from 'next/navigation'
import { getBuilding } from '@/app/_lib/db/buildings/controller'
import DeleteBuilding from '@/app/_lib/ui/Buildings/Delete'

const DeleteDependencies = async (props) => {
    const { params } = props
    const id = params.id
    const deletingBuilding = await getBuilding(id)
    if (!deletingBuilding) {
        notFound()
    }

    return (
        <DeleteBuilding deletingData={deletingBuilding || {}} />
    )
}

export default DeleteDependencies
import React from 'react'
import { notFound } from 'next/navigation'
import { getBuilding, getBuildings } from '@/app/_lib/db/buildings/controller'
import { getUsersByBuildingId } from '@/app/_lib/db/user/controller'
import DeleteBuilding from '@/app/_lib/ui/Buildings/Delete'

const DeleteDependencies = async (props) => {
    const { params } = props
    const id = params.id
    const deletingBuilding = await getBuilding(id)
    if (!deletingBuilding) {
        notFound()
    }
    const usersofSelectedBuilding = await getUsersByBuildingId(id)
    const allBuildings = await getBuildings()

    return (
        <DeleteBuilding
            deletingData={deletingBuilding || {}}
            usersData={usersofSelectedBuilding || []}
            buildingsData={allBuildings || []}
        />
    )
}

export default DeleteDependencies
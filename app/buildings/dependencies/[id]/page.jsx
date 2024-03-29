import React from 'react'
import { notFound } from 'next/navigation'
import { getBuilding, getBuildings, getRestOfTheBuildings } from '@/app/_lib/db/buildings/controller'
import { getUsersByBuildingId } from '@/app/_lib/db/user/controller'
import DeleteBuilding from '@/app/_lib/components/features/buildings/Delete'

export const metadata = {
    title: 'Delete Building',
}

const DeleteDependencies = async (props) => {
    const { params } = props
    const id = params.id
    const deletingBuilding = await getBuilding(id)
    if (!deletingBuilding) {
        notFound()
    }
    const usersofSelectedBuilding = await getUsersByBuildingId(id)
    const allBuildings = await getBuildings()
    const restOfBuildings = await getRestOfTheBuildings(id)

    return (
        <DeleteBuilding
            deletingData={deletingBuilding || {}}
            usersData={usersofSelectedBuilding || []}
            buildingsData={allBuildings || []}
            restOfBuildings={restOfBuildings || []}
        />
    )
}

export default DeleteDependencies
import EditUserForm from '@/app/_lib/components/features/users/EditForm'
import React from 'react'
import { notFound } from 'next/navigation'
import { getBuildings } from '@/app/_lib/db/buildings/controller'
import { getDepartments } from '@/app/_lib/db/departments/controller'
import { getUser } from '@/app/_lib/db/user/controller'

export const metadata = {
    title: 'Edit User',
}

const EditUser = async (props) => {
    const { params } = props
    const id = params.id
    const editingUser = await getUser(id)
    if (!editingUser) {
        notFound()
    }

    const allBuildingsData = getBuildings()
    const allDepartmentsData = getDepartments()
    const [allBuildings, allDepartments] = await Promise.all([allBuildingsData, allDepartmentsData])

    return (
        <EditUserForm allBuildings={allBuildings || []} allDepartments={allDepartments || []} editingData={editingUser} />
    )
}

export default EditUser
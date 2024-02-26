import EditUserForm from '@/app/_lib/ui/UserManagement/EditForm'
import React from 'react'
import { notFound } from 'next/navigation'
import { getBuildings } from '@/app/_lib/db/buildings/controller'
import { getDepartments } from '@/app/_lib/db/departments/controller'
import { getUser } from '@/app/_lib/db/user/controller'

const EditUser = async (props) => {
    const { params } = props
    const id = params.id
    const editingUser = await getUser(id)
    if (!editingUser) {
        notFound()
    }

    const allBuildings = await getBuildings()
    const allDepartments = await getDepartments()

    return (
        <EditUserForm allBuildings={allBuildings || []} allDepartments={allDepartments || []} editingData={editingUser} />
    )
}

export default EditUser
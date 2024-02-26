import { getBuildings } from '@/app/_lib/db/buildings/controller'
import { getDepartments } from '@/app/_lib/db/departments/controller'
import UserForm from '@/app/_lib/ui/UserManagement/Form'
import React from 'react'

const AddUser = async () => {
    const allBuildings = await getBuildings()
    const allDepartments = await getDepartments()

    return (
        <UserForm allBuildings={allBuildings || []} allDepartments={allDepartments || []} />
    )
}

export default AddUser
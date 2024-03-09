import { getBuildings } from '@/app/_lib/db/buildings/controller'
import { getDepartments } from '@/app/_lib/db/departments/controller'
import UserForm from '@/app/_lib/components/features/users/Form'
import React from 'react'
import { unstable_noStore as noStore } from 'next/cache';

export const metadata = {
    title: 'Add User',
}

const AddUser = async () => {
    noStore()
    const allBuildings = await getBuildings()
    const allDepartments = await getDepartments()

    return (
        <UserForm allBuildings={allBuildings || []} allDepartments={allDepartments || []} />
    )
}

export default AddUser
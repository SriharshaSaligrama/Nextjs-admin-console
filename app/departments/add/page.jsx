import { getDepartments } from '@/app/_lib/db/departments/controller'
import Form from '@/app/_lib/ui/DepartmentCategory/Form'
import React from 'react'
import { unstable_noStore as noStore } from 'next/cache';

const AddDepartment = async () => {
    noStore()
    const allDepartments = await getDepartments()

    return (
        <Form allData={allDepartments} />
    )
}

export default AddDepartment
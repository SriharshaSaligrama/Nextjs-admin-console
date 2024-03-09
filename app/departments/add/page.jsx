import { getDepartments } from '@/app/_lib/db/departments/controller'
import Form from '@/app/_lib/components/features/departmentcategory/Form'
import React from 'react'
import { unstable_noStore as noStore } from 'next/cache';

export const metadata = {
    title: 'Add Department',
}

const AddDepartment = async () => {
    noStore()
    const allDepartments = await getDepartments()

    return (
        <Form allData={allDepartments} />
    )
}

export default AddDepartment
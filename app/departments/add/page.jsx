import { getDepartments } from '@/app/_lib/db/departments/controller'
import Form from '@/app/_lib/ui/DepartmentCategory/Form'
import React from 'react'

const AddDepartment = async () => {
    const allDepartments = await getDepartments()

    return (
        <Form allData={allDepartments} />
    )
}

export default AddDepartment
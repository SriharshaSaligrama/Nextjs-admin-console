import { getDepartments } from '@/app/lib/departments/controller'
import Form from '@/app/ui/DepartmentCategory/Form'
import React from 'react'

const AddDepartment = async () => {
    const allDepartments = await getDepartments()

    return (
        <Form allData={allDepartments} />
    )
}

export default AddDepartment
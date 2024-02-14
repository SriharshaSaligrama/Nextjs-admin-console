import { getDepartment, getParentDepartments } from '@/app/lib/departments/controller'
import Form from '@/app/ui/DepartmentCategory/Form'
import React from 'react'

const EditDepartment = async (props) => {
    const { params } = props
    const id = params.id
    const editingDepartment = await getDepartment(id)
    const allDepartments = await getParentDepartments(id)

    return (
        <Form allData={allDepartments} editingData={editingDepartment} />
    )
}

export default EditDepartment
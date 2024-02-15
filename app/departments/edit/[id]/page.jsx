import { getDepartment, getParentDepartments } from '@/app/lib/departments/controller'
import Form from '@/app/ui/DepartmentCategory/Form'
import React from 'react'
import { notFound } from 'next/navigation'

const EditDepartment = async (props) => {
    const { params } = props
    const id = params.id
    const editingDepartment = await getDepartment(id)
    if (!editingDepartment) {
        notFound()
    }
    const allDepartments = await getParentDepartments(id)

    return (
        <Form allData={allDepartments} editingData={editingDepartment} />
    )
}

export default EditDepartment
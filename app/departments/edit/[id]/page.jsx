import { getDepartment, getParentDepartments } from '@/app/_lib/db/departments/controller'
import Form from '@/app/_lib/ui/DepartmentCategory/Form'
import React from 'react'
import { notFound } from 'next/navigation'

export const metadata = {
    title: 'Edit Department',
}

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
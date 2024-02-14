import React from 'react'
import { getChildrenDepartments, getDepartment, getParentDepartments } from '@/app/lib/departments/controller'
import Delete from '@/app/ui/DepartmentCategory/Delete'

const DeleteDependencies = async (props) => {
    const { params } = props
    const id = params.id
    const deletingDepartment = await getDepartment(id)
    const childrenDepartments = await getChildrenDepartments(id)
    const parentDepartments = await getParentDepartments(id)

    return (
        <Delete
            deletingData={deletingDepartment || {}}
            childrenData={childrenDepartments || []}
            parentData={parentDepartments || []}
        />
    )
}

export default DeleteDependencies
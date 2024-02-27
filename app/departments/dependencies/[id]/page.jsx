import React from 'react'
import { getChildrenDepartments, getDepartment, getParentDepartments } from '@/app/_lib/db/departments/controller'
import Delete from '@/app/_lib/ui/DepartmentCategory/Delete'
import { notFound } from 'next/navigation'
import { getUsersByDepartmentId } from '@/app/_lib/db/user/controller'

const DeleteDependencies = async (props) => {
    const { params } = props
    const id = params.id
    const deletingDepartment = await getDepartment(id)
    if (!deletingDepartment) {
        notFound()
    }
    const childrenDepartments = await getChildrenDepartments(id)
    const parentDepartments = await getParentDepartments(id)
    const usersOfdeletingDepartment = await getUsersByDepartmentId(id)

    return (
        <Delete
            deletingData={deletingDepartment || {}}
            childrenData={childrenDepartments || []}
            parentData={parentDepartments || []}
            usersData={usersOfdeletingDepartment || []}
        />
    )
}

export default DeleteDependencies
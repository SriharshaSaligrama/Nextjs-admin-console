import React from 'react'
import { getChildrenDepartments, getDepartment, getParentDepartments } from '@/app/_lib/db/departments/controller'
import Delete from '@/app/_lib/components/features/departmentcategory/Delete'
import { notFound } from 'next/navigation'
import { getUsersByDepartmentId } from '@/app/_lib/db/user/controller'
import { getNotificationMappingByDepartmentId } from '@/app/_lib/db/notifications/controller'

export const metadata = {
    title: 'Delete Department',
}

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
    const notificationsData = await getNotificationMappingByDepartmentId(id)

    return (
        <Delete
            deletingData={deletingDepartment || {}}
            childrenData={childrenDepartments || []}
            parentData={parentDepartments || []}
            usersData={usersOfdeletingDepartment || []}
            notificationsData={notificationsData || []}
        />
    )
}

export default DeleteDependencies
import React from 'react'
import Delete from '@/app/_lib/components/features/departmentcategory/Delete'
import { getCategory, getChildrenCategories, getParentCategories } from '@/app/_lib/db/categories/controller'
import { notFound } from 'next/navigation'
import { getNotificationMappingByCategoryId } from '@/app/_lib/db/notifications/controller'

export const metadata = {
    title: 'Delete Category',
}

const DeleteDependencies = async (props) => {
    const { params } = props
    const id = params.id
    const deletingCategory = await getCategory(id)
    if (!deletingCategory) {
        notFound()
    }
    const childrenCategoriesData = getChildrenCategories(id)
    const parentCategoriesData = getParentCategories(id)
    const notificationsData = getNotificationMappingByCategoryId(id)
    const [childrenCategories, parentCategories, notifications] = await Promise.all([
        childrenCategoriesData, parentCategoriesData, notificationsData
    ])

    return (
        <Delete
            deletingData={deletingCategory || {}}
            childrenData={childrenCategories || []}
            parentData={parentCategories || []}
            notificationsData={notifications || []}
        />
    )
}

export default DeleteDependencies
import React from 'react'
import Delete from '@/app/_lib/ui/DepartmentCategory/Delete'
import { getCategory, getChildrenCategories, getParentCategories } from '@/app/_lib/db/categories/controller'
import { notFound } from 'next/navigation'

const DeleteDependencies = async (props) => {
    const { params } = props
    const id = params.id
    const deletingCategory = await getCategory(id)
    if (!deletingCategory) {
        notFound()
    }
    const childrenCategories = await getChildrenCategories(id)
    const parentCategories = await getParentCategories(id)

    return (
        <Delete
            deletingData={deletingCategory || {}}
            childrenData={childrenCategories || []}
            parentData={parentCategories || []}
        />
    )
}

export default DeleteDependencies
import React from 'react'
import Delete from '@/app/ui/DepartmentCategory/Delete'
import { getCategory, getChildrenCategories, getParentCategories } from '@/app/lib/categories/controller'

const DeleteDependencies = async (props) => {
    const { params } = props
    const id = params.id
    const deletingCategory = await getCategory(id)
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
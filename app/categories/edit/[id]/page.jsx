import { getCategory, getParentCategories } from '@/app/lib/categories/controller'
import Form from '@/app/ui/DepartmentCategory/Form'
import React from 'react'
import { notFound } from 'next/navigation'

const EditCategory = async (props) => {
    const { params } = props
    const id = params.id
    const editingCategory = await getCategory(id)
    if (!editingCategory) {
        notFound()
    }
    const allCategories = await getParentCategories(id)

    return (
        <Form allData={allCategories} editingData={editingCategory} />
    )
}

export default EditCategory
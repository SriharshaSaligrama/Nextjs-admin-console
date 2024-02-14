import { getCategory, getParentCategories } from '@/app/lib/categories/controller'
import Form from '@/app/ui/DepartmentCategory/Form'
import React from 'react'

const EditCategory = async (props) => {
    const { params } = props
    const id = params.id
    const editingCategory = await getCategory(id)
    const allCategories = await getParentCategories(id)

    return (
        <Form allData={allCategories} editingData={editingCategory} />
    )
}

export default EditCategory
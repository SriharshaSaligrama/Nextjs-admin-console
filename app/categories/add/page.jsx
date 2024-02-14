import { getCategories } from '@/app/lib/categories/controller'
import Form from '@/app/ui/DepartmentCategory/Form'
import React from 'react'

const AddCategory = async () => {
    const allCategories = await getCategories()

    return (
        <Form allData={allCategories} />
    )
}

export default AddCategory
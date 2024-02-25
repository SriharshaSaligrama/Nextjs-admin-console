import { getCategories } from '@/app/_lib/db/categories/controller'
import Form from '@/app/_lib/ui/DepartmentCategory/Form'
import React from 'react'

const AddCategory = async () => {
    const allCategories = await getCategories()

    return (
        <Form allData={allCategories} />
    )
}

export default AddCategory
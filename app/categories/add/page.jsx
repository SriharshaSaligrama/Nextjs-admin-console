import { getCategories } from '@/app/_lib/db/categories/controller'
import Form from '@/app/_lib/ui/DepartmentCategory/Form'
import React from 'react'
import { unstable_noStore as noStore } from 'next/cache';

export const metadata = {
    title: 'Add Category',
}

const AddCategory = async () => {
    noStore()
    const allCategories = await getCategories()

    return (
        <Form allData={allCategories} />
    )
}

export default AddCategory
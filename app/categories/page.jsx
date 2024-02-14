import React from 'react'
import { getCategories } from '../lib/categories/controller'
import Home from '../ui/DepartmentCategory'

const Categories = async () => {
    const data = await getCategories()

    return (
        <Home data={data || []} />
    )
}

export default Categories
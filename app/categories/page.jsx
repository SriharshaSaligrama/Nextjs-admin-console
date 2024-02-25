import React from 'react'
import { getCategories } from '../_lib/db/categories/controller'
import Home from '../_lib/ui/FeatureHome'

const Categories = async () => {
    const data = await getCategories()

    return (
        <Home data={data || []} />
    )
}

export default Categories
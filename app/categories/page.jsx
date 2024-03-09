import React from 'react'
import { getCategories } from '../_lib/db/categories/controller'
import Home from '../_lib/components/features/featurehome'
import { unstable_noStore as noStore } from 'next/cache';

export const metadata = {
    title: 'Categories',
}

const Categories = async () => {
    noStore()
    const data = await getCategories()

    return (
        <Home data={data || []} />
    )
}

export default Categories
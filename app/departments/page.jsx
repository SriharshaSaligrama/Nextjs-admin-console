import React from 'react'
import { getDepartments } from '../_lib/db/departments/controller'
import Home from '../_lib/ui/FeatureHome'
import { unstable_noStore as noStore } from 'next/cache';

export const metadata = {
    title: 'Departments',
}

const Departments = async () => {
    noStore()
    const data = await getDepartments()

    return (
        <Home data={data || []} />
    )
}

export default Departments
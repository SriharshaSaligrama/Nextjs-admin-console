import React from 'react'
import { getDepartments } from '../_lib/db/departments/controller'
import Home from '../_lib/ui/FeatureHome'

const Departments = async () => {
    const data = await getDepartments()

    return (
        <Home data={data || []} />
    )
}

export default Departments
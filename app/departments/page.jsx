import React from 'react'
import { getDepartments } from '../lib/departments/controller'
import Home from '../ui/DepartmentCategory'

const Departments = async () => {
    const data = await getDepartments()

    return (
        <Home data={data || []} />
    )
}

export default Departments
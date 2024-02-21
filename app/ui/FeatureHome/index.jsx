'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Typography, Box, Button } from '@mui/material'
import DataTable from '../DataTable'
import { buildingColumns, categoryColumns, departmentColumns, locationColumns, userColumns } from '@/app/lib/constants'

const Home = (props) => {
    const { data } = props
    const router = useRouter()
    const pathname = usePathname()
    const heading = pathname.includes('departments') ? 'Departments' :
        pathname.includes('categories') ? 'Categories' :
            pathname.includes('locations') ? 'Locations' :
                pathname.includes('buildings') ? 'Buildings' :
                    pathname.includes('users') ? 'Users' : ''
    const returnLink = pathname.includes('departments') ? 'departments' :
        pathname.includes('categories') ? 'categories' :
            pathname.includes('locations') ? 'locations' :
                pathname.includes('buildings') ? 'buildings' :
                    pathname.includes('users') ? 'users' : ''
    const addButtonLabel = pathname.includes('departments') ? 'Department' :
        pathname.includes('categories') ? 'Category' :
            pathname.includes('locations') ? 'Location' :
                pathname.includes('buildings') ? 'Building' :
                    pathname.includes('users') ? 'User' : ''
    const columns = pathname.includes('departments') ? departmentColumns :
        pathname.includes('categories') ? categoryColumns :
            pathname.includes('locations') ? locationColumns :
                pathname.includes('buildings') ? buildingColumns :
                    pathname.includes('users') ? userColumns : []

    return (
        <>
            <Typography sx={{ ...styles.heading }}>{heading}</Typography>
            <Box sx={{ ...styles.addButton }}>
                <Button variant='contained' onClick={() => router.push(`/${returnLink}/add`)}>Add New {addButtonLabel}</Button>
            </Box>
            <DataTable columns={columns} rows={data} />
        </>
    )
}

export default Home

const styles = {
    heading: {
        fontSize: "24px",
        fontWeight: 600,
        marginBottom: "16px",
    },
    addButton: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "16px",
    }
}
'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Box, Button } from '@mui/material'
import { pageMappings } from '@/app/_lib/constants'
import DataTable from '../DataTable'
import PageHeading from '../PageHeading'

const Home = (props) => {
    const { data } = props
    const router = useRouter()
    const pathname = usePathname()

    const currentPage = pageMappings.find(mapping => pathname.includes(mapping.keyword)) || {
        heading: '',
        returnLink: '',
        addButtonLabel: '',
        columns: [],
    };

    return (
        <>
            <PageHeading heading={currentPage.heading} />
            <Box sx={{ ...styles.addButton }}>
                <Button
                    variant='contained'
                    onClick={() => router.push(`/${currentPage.returnLink}/add`)}
                >
                    Add New {currentPage.addButtonLabel}
                </Button>
            </Box>
            {!pathname.includes('groups') && <DataTable columns={currentPage.columns} rows={data} />}
        </>
    )
}

export default Home

const styles = {
    addButton: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "16px",
    }
}
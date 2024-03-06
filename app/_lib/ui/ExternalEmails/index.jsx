'use client'

import React from 'react'
import PageHeading from '../PageHeading'
import DataTable from '../DataTable'
import { externalEmailsColumns } from '../../constants'
import GroupRouter from './GroupRouter'

const ExternalEmailsHome = (props) => {
    const { data } = props

    const columns = [
        ...externalEmailsColumns,
        {
            field: 'Groups',
            width: 500,
            editable: false,
            renderCell: (params) => {
                if (params.row.groups?.length > 0) {
                    return <GroupRouter groups={params.row.groups} />
                }
            }
        },
    ]

    return (
        <>
            <PageHeading heading='External Emails' />
            <DataTable columns={columns} rows={data} />
        </>
    )
}

export default ExternalEmailsHome
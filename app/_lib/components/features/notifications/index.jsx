'use client'

import React, { useEffect, useState } from 'react'
import ServerPaginatedDataTable from '../../ui/datatable/ServerPaginatedDataTable'
import { notificationMappingsColumns } from './columns'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const NotificationsHomePage = (props) => {
    const { data } = props

    const pathname = usePathname();

    const searchParams = useSearchParams();

    const { replace } = useRouter();

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 3,
    });

    const [pageInfo, setPageInfo] = useState({
        "isLoading": true,
        "totalDocuments": 0,
        "totalNumberOfPages": 3
    })

    useEffect(() => {
        //after fetching data
        setPageInfo({
            "isLoading": false,
            "totalDocuments": data.totalDocuments,
            "totalNumberOfPages": data.totalNumberOfPages
        })
    }, [data.totalDocuments, data.totalNumberOfPages])

    useEffect(() => {
        setPaginationModel({
            page: 0,
            pageSize: pageInfo?.totalNumberOfPages
        })
    }, [pageInfo?.totalNumberOfPages])

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set('page', (paginationModel.page + 1).toString());
        replace(`${pathname}?${params.toString()}`);
    }, [paginationModel?.page, searchParams, replace, pathname]);

    return (
        <ServerPaginatedDataTable
            columns={notificationMappingsColumns}
            rows={data?.data || []}
            loading={pageInfo?.isLoading}
            pageSizeOptions={[paginationModel?.pageSize]}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            pageInfo={pageInfo}
        />
    )
}

export default NotificationsHomePage
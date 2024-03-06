import React from 'react'
import { unstable_noStore as noStore } from 'next/cache';
import Card from '../_lib/ui/Groups/Card';
import { getPaginatedGroups, getQueryFilteredPaginatedGroups } from '../_lib/db/groups/controller';
import PageHeading from '../_lib/ui/PageHeading';
import SearchBarAddButton from '../_lib/ui/Groups/SearchBarAddButton';

export const metadata = {
    title: 'Groups',
}

const Groups = async ({ searchParams }) => {
    noStore()

    const currentPage = +searchParams?.page || 1

    const data = await getPaginatedGroups(currentPage)

    let queryData = []

    if (searchParams?.query) {
        queryData = await getQueryFilteredPaginatedGroups(searchParams?.query, currentPage) || []
    }

    const groupsData = searchParams?.query ? (queryData?.filteredGroupsByPage || []) : (data?.groupsByPage || [])

    const totalPages = searchParams?.query ? (queryData?.totalNumberOfPages || 1) : (data?.totalNumberOfPages || 1)

    return (
        <>
            <PageHeading heading='Groups' />
            <SearchBarAddButton groupsData={groupsData} totalPages={totalPages} currentPage={currentPage} />
            <Card groupsData={groupsData} totalPages={totalPages} currentPage={currentPage} />
        </>
    )
}

export default Groups
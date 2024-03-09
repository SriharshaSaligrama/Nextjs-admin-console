import { getGroup } from '@/app/_lib/db/groups/controller'
import React from 'react'
import { notFound } from 'next/navigation'
import Card from '@/app/_lib/components/features/groups/Card'
import PageHeading from '@/app/_lib/components/ui/pageheading'

export const metadata = {
    title: 'View Group',
}

const GetGroup = async (props) => {
    const { params } = props
    const id = params.id
    const groupsData = await getGroup(id)
    if (!groupsData) {
        notFound()
    }

    return (
        <>
            <PageHeading heading='Groups' />
            <Card groupsData={[groupsData]} totalPages={1} currentPage={1} />
        </>
    )
}

export default GetGroup
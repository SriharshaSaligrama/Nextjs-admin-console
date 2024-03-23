import React from 'react'
import ExternalEmailsHome from '../_lib/components/features/externalemails'
import { getAllExternalEmails } from '../_lib/db/groups/controller'
import { unstable_noStore as noStore } from 'next/cache';

export const metadata = {
    title: 'External Emails',
}

const ExternalEmails = async () => {
    noStore()
    const data = await getAllExternalEmails()

    return (
        <ExternalEmailsHome data={data || []} />
    )
}

export default ExternalEmails
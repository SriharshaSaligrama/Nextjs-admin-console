import React from 'react'
import ExternalEmailsHome from '../_lib/ui/ExternalEmails'
import { getAllExternalEmails } from '../_lib/db/groups/controller'

export const metadata = {
    title: 'External Emails',
}

const ExternalEmails = async () => {
    const data = await getAllExternalEmails()

    return (
        <ExternalEmailsHome data={data || []} />
    )
}

export default ExternalEmails
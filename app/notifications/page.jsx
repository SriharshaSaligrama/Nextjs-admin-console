import React from 'react'
import Home from '../_lib/components/features/featurehome'
import { getNotificationsMapping } from '../_lib/db/notifications/controller'
import { unstable_noStore as noStore } from 'next/cache';

export const metadata = {
    title: 'Notifications',
}

const NotificationMappings = async () => {
    noStore()

    const data = await getNotificationsMapping()

    return (
        <Home data={data || []} />
    )
}

export default NotificationMappings
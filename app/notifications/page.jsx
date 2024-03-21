import React from 'react'
import Home from '../_lib/components/features/featurehome'
import { getNotificationsMapping } from '../_lib/db/notifications/controller'
import { unstable_noStore as noStore } from 'next/cache';
// import NotificationsHomePage from '../_lib/components/features/notifications';

export const metadata = {
    title: 'Notifications',
}

const NotificationMappings = async () => {
    noStore()
    // const { searchParams }=props
    // const currentPage = +searchParams?.page || 1

    // const [data] = await getPaginatedNotificationsMapping(currentPage)
    const data = await getNotificationsMapping()

    return (
        <Home data={data || []} />
        // <NotificationsHomePage data={data || []} />
    )
}

export default NotificationMappings
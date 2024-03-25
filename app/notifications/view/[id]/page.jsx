import { getNotificationMappingPopulated } from '@/app/_lib/db/notifications/controller'
import React from 'react'
import { notFound } from 'next/navigation'
import { ViewNotificationMapping } from '@/app/_lib/components/features/notifications/View'

export const metadata = {
    title: 'View Notification Mapping',
}

const NotificationView = async (props) => {
    const { params } = props
    const id = params.id
    const notificationMap = await getNotificationMappingPopulated(id)

    if (!notificationMap) {
        notFound()
    }

    return (
        <ViewNotificationMapping notificationMap={notificationMap} />
    )
}

export default NotificationView
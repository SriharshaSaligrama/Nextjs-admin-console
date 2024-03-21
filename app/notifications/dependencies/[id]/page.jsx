import { getNotificationMappingPopulated } from '@/app/_lib/db/notifications/controller'
import React from 'react'
import { notFound } from 'next/navigation'
import DeleteNotificationMap from '@/app/_lib/components/features/notifications/Delete'

export const metadata = {
    title: 'Delete Notification Mapping',
}

const DeleteNotificationMapping = async (props) => {
    const { params } = props
    const id = params.id
    const deletingNotificationMap = await getNotificationMappingPopulated(id)

    if (!deletingNotificationMap) {
        notFound()
    }

    return (
        <DeleteNotificationMap deletingData={deletingNotificationMap || {}} />
    )
}

export default DeleteNotificationMapping
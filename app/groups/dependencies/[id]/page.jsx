import { getGroup, getGroups, getRestOfTheGroups } from '@/app/_lib/db/groups/controller'
import React from 'react'
import { notFound } from 'next/navigation'
import DeleteGroup from '@/app/_lib/components/features/groups/Delete'
import { getNotificationMappingByGroupId } from '@/app/_lib/db/notifications/controller'

export const metadata = {
    title: 'Delete Group',
}

const DeleteDependencies = async (props) => {
    const { params } = props
    const id = params.id
    const deletingGroup = await getGroup(id)
    if (!deletingGroup) {
        notFound()
    }
    const allGroups = await getGroups()
    const restOfGroups = await getRestOfTheGroups(id)
    const notificationsData = await getNotificationMappingByGroupId(id)

    return (
        <DeleteGroup
            deletingData={deletingGroup || {}}
            groupsData={allGroups || []}
            restOfGroups={restOfGroups || []}
            notificationsData={notificationsData || []}
        />
    )
}

export default DeleteDependencies
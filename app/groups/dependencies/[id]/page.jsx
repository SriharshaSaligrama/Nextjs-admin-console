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
    const allGroupsData = getGroups()
    const restOfGroupsData = getRestOfTheGroups(id)
    const notificationsData = getNotificationMappingByGroupId(id)
    const [allGroups, restOfGroups, notifications] = await Promise.all([
        allGroupsData, restOfGroupsData, notificationsData
    ])

    return (
        <DeleteGroup
            deletingData={deletingGroup || {}}
            groupsData={allGroups || []}
            restOfGroups={restOfGroups || []}
            notificationsData={notifications || []}
        />
    )
}

export default DeleteDependencies
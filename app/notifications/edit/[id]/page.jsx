import { getNotificationMapping } from '@/app/_lib/db/notifications/controller'
import React from 'react'
import { notFound } from 'next/navigation'
import NotificationMappingForm from '@/app/_lib/components/features/notifications/Form'
import { getCategories } from '@/app/_lib/db/categories/controller'
import { getDepartments } from '@/app/_lib/db/departments/controller'
import { getGroups } from '@/app/_lib/db/groups/controller'
import { getLocationsWithBuildings } from '@/app/_lib/db/buildings/controller'

export const metadata = {
    title: 'Edit Notification Mapping',
}

const EditNotificationMapping = async (props) => {
    const { params } = props
    const id = params.id
    const updatingNotificationMap = await getNotificationMapping(id)

    if (!updatingNotificationMap) {
        notFound()
    }

    const categories = await getCategories()
    const departments = await getDepartments()
    const groups = await getGroups()
    const locations = await getLocationsWithBuildings()

    return (
        <NotificationMappingForm
            categories={categories || []}
            departments={departments || []}
            groups={groups || []}
            locations={locations || []}
            updatingNotificationMap={updatingNotificationMap}
        />
    )
}

export default EditNotificationMapping
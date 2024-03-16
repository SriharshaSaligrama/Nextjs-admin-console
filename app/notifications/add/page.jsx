import NotificationMappingForm from '@/app/_lib/components/features/notifications/Form'
import { getLocationsWithBuildings } from '@/app/_lib/db/buildings/controller'
import { getCategories } from '@/app/_lib/db/categories/controller'
import { getDepartments } from '@/app/_lib/db/departments/controller'
import { getGroups } from '@/app/_lib/db/groups/controller'
import React from 'react'

export const metadata = {
    title: 'Add Notification Mapping',
}

const AddNotificationMappings = async () => {
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
        />
    )
}

export default AddNotificationMappings
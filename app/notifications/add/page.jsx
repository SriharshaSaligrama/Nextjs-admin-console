import NotificationMappingForm from '@/app/_lib/components/features/notifications/Form'
import { getLocationsWithBuildings } from '@/app/_lib/db/buildings/controller'
import { getCategories } from '@/app/_lib/db/categories/controller'
import { getDepartments } from '@/app/_lib/db/departments/controller'
import { getGroups } from '@/app/_lib/db/groups/controller'
import React from 'react'
import { unstable_noStore as noStore } from 'next/cache';

export const metadata = {
    title: 'Add Notification Mapping',
}

const AddNotificationMappings = async () => {
    noStore()

    const categoriesData = getCategories()
    const departmentsData = getDepartments()
    const groupsData = getGroups()
    const locationsData = getLocationsWithBuildings()
    const [categories, departments, groups, locations] = await Promise.all([categoriesData, departmentsData, groupsData, locationsData])

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
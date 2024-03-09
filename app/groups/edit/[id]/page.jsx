import { getGroup } from '@/app/_lib/db/groups/controller'
import GroupsForm from '@/app/_lib/components/features/groups/Form'
import React from 'react'
import { notFound } from 'next/navigation'

export const metadata = {
    title: 'Edit Group',
}

const EditGroup = async (props) => {
    const { params } = props
    const id = params.id
    const editingGroup = await getGroup(id)
    if (!editingGroup) {
        notFound()
    }

    return (
        <GroupsForm editingData={editingGroup} />
    )
}

export default EditGroup
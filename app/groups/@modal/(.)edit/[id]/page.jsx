import { getGroup } from '@/app/_lib/db/groups/controller'
import GroupsModalForm from '@/app/_lib/components/features/groups/FormModal'
import Modal from '@/app/_lib/components/ui/modal'
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
        <Modal title='Edit Group'>
            <GroupsModalForm editingData={editingGroup} />
        </Modal>
    )
}

export default EditGroup
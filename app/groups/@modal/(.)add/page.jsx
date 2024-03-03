import React from 'react'
import { unstable_noStore as noStore } from 'next/cache';
import Modal from '@/app/_lib/ui/Modal';
import GroupsModalForm from '@/app/_lib/ui/Groups/FormModal';

export const metadata = {
    title: 'Add Group',
}

const AddGroup = async () => {
    noStore()

    return (
        <Modal title='Add Group'>
            <GroupsModalForm />
        </Modal>
    )
}

export default AddGroup
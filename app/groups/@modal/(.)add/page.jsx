import React from 'react'
import { unstable_noStore as noStore } from 'next/cache';
import Modal from '@/app/_lib/ui/Modal';

export const metadata = {
    title: 'Add Group',
}

const AddGroup = async () => {
    noStore()

    return (
        <Modal title='Add Group'>
            <div>AddGroup</div>
        </Modal>
    )
}

export default AddGroup
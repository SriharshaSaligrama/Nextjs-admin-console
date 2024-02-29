import Modal from '@/app/_lib/ui/Modal'
import React from 'react'

export const metadata = {
    title: 'Edit Group',
}

const EditGroup = async (props) => {
    const { params } = props
    const id = params.id

    return (
        <Modal title='Edit Group'>
            <div>Edit Group {id}</div>
        </Modal>
    )
}

export default EditGroup
import React from 'react'

export const metadata = {
    title: 'Edit Group',
}

const EditGroup = async (props) => {
    const { params } = props
    const id = params.id

    return (
        <div>Edit Group {id}</div>
    )
}

export default EditGroup
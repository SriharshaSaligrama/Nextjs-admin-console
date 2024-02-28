import React from 'react'

export const metadata = {
    title: 'Edit Group',
}

const EditGroup = async (props) => {
    const { params } = props
    const id = params.id

    return (
        <h1>Edit Group {id}</h1>
    )
}

export default EditGroup
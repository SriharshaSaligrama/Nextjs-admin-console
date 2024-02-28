import React from 'react'

export const metadata = {
    title: 'Delete Group',
}

const DeleteDependencies = async (props) => {
    const { params } = props
    const id = params.id

    return (
        <h1>Delete Group {id}</h1>
    )
}

export default DeleteDependencies
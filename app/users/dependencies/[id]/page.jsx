import DeleteUser from '@/app/_lib/components/features/users/Delete'
import React from 'react'
import { notFound } from 'next/navigation'
import { getUser } from '@/app/_lib/db/user/controller'

export const metadata = {
    title: 'Delete User',
}

const DeleteUserPage = async (props) => {
    const { params } = props
    const id = params.id
    const deletingUser = await getUser(id)
    if (!deletingUser) {
        notFound()
    }

    return (
        <DeleteUser deletingData={deletingUser || {}} />
    )
}

export default DeleteUserPage
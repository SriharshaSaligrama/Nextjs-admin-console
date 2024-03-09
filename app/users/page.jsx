import React from 'react'
import Home from '../_lib/components/features/featurehome'
import { getUsers } from '../_lib/db/user/controller'
import { unstable_noStore as noStore } from 'next/cache';

export const metadata = {
    title: 'Users',
}

const UserManagementHome = async () => {
    noStore()
    const data = await getUsers()

    return (
        <Home data={data || []} />
    )
}

export default UserManagementHome

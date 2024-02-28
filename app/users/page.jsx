import React from 'react'
import Home from '../_lib/ui/FeatureHome'
import { getUsers } from '../_lib/db/user/controller'
import { unstable_noStore as noStore } from 'next/cache';

const UserManagementHome = async () => {
    noStore()
    const data = await getUsers()

    return (
        <Home data={data || []} />
    )
}

export default UserManagementHome

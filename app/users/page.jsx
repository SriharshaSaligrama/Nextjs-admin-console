import React from 'react'
import Home from '../_lib/ui/FeatureHome'
import { getUsers } from '../_lib/db/user/controller'

const UserManagementHome = async () => {
    const data = await getUsers()

    return (
        <Home data={data || []} />
    )
}

export default UserManagementHome

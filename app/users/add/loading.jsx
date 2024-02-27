import UsersFormSkeleton from '@/app/_lib/ui/UserManagement/FormSkeleton'
import React from 'react'

const Loading = () => {
    return (
        <UsersFormSkeleton numberOfInputs={7} />
    )
}

export default Loading
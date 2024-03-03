import React from 'react'
import { unstable_noStore as noStore } from 'next/cache';
import GroupsForm from '@/app/_lib/ui/Groups/Form';

export const metadata = {
    title: 'Add Group',
}

const AddGroup = async () => {
    noStore()

    return (
        <GroupsForm />
    )
}

export default AddGroup
import React from 'react'
import { unstable_noStore as noStore } from 'next/cache';

export const metadata = {
    title: 'Add Group',
}

const AddGroup = async () => {
    noStore()

    return (
        <div>AddGroup</div>
    )
}

export default AddGroup
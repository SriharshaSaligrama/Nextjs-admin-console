import LocationsForm from '@/app/_lib/components/features/locations/Form'
import React from 'react'
import { unstable_noStore as noStore } from 'next/cache';

export const metadata = {
    title: 'Add Location',
}

const AddLocation = async () => {
    noStore()

    return (
        <LocationsForm />
    )
}

export default AddLocation
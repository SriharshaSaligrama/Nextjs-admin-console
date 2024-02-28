import React from 'react'
import { notFound } from 'next/navigation'
import { getLocation } from '@/app/_lib/db/locations/controller'
import LocationsForm from '@/app/_lib/ui/Locations/Form'

export const metadata = {
    title: 'Edit Location',
}

const EditLocation = async (props) => {
    const { params } = props
    const id = params.id
    const editingLocation = await getLocation(id)
    if (!editingLocation) {
        notFound()
    }

    return (
        <LocationsForm editingData={editingLocation} />
    )
}

export default EditLocation
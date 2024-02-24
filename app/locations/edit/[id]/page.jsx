import React from 'react'
import { notFound } from 'next/navigation'
import { getLocation } from '@/app/lib/locations/controller'
import LocationsForm from '@/app/ui/Locations/Form'

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
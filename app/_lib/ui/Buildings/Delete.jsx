'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { deleteBuildingAction } from '@/app/_lib/db/buildings/actions'
import PageHeading from '../PageHeading'
import DeleteCancelButtons from '../DeleteCancelButtons'

const DeleteBuilding = (props) => {
    const { deletingData } = props
    const router = useRouter()

    const handleCancelClick = () => {
        router.push('/buildings')
    }

    const handleDeleteClick = async () => {
        await deleteBuildingAction({ id: deletingData?.id })
    }

    return (
        <>
            <PageHeading heading='Delete Dependencies' />
            <DeleteCancelButtons handleCancelClick={handleCancelClick} handleDeleteClick={handleDeleteClick} disabled={true} />
        </>
    )
}

export default DeleteBuilding

// const styles = {
//     dependenciesContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '80dvh'
//     },
//     noDependenciesContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '80dvh'
//     }
// }
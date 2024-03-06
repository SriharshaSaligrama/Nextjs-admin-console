import CardSkeleton from '@/app/_lib/ui/Groups/CardSkeleton'
import React from 'react'

const Loading = () => {
    return (
        <CardSkeleton cardItemsLength={1} hideSearchAddButton />
    )
}

export default Loading
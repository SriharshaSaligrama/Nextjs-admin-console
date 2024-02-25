import DefaultNotFound from '@/app/_lib/ui/NotFound'
import React from 'react'

const NotFound = () => {
    return (
        <DefaultNotFound
            entity={'location'}
            returnLink={'/locations'}
            returnPageName={'Locations'}
        />
    )
}

export default NotFound
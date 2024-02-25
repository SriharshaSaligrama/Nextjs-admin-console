import DefaultNotFound from '@/app/_lib/ui/NotFound'
import React from 'react'

const NotFound = () => {
    return (
        <DefaultNotFound
            entity={'building'}
            returnLink={'/buildings'}
            returnPageName={'Buildings'}
        />
    )
}

export default NotFound
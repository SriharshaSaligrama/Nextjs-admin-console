import DefaultNotFound from '@/app/ui/NotFound/defaultNotFound'
import React from 'react'

const NotFound = () => {
    return (
        <DefaultNotFound
            entity={'category'}
            returnLink={'/categories'}
            returnPageName={'Categories'}
        />
    )
}

export default NotFound
import DefaultNotFound from '@/app/_lib/ui/NotFound'
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
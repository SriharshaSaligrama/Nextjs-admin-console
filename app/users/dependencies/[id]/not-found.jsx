import DefaultNotFound from '@/app/_lib/ui/NotFound'
import React from 'react'

const NotFound = () => {
    return (
        <DefaultNotFound
            entity={'user'}
            returnLink={'/users'}
            returnPageName={'Users'}
        />
    )
}

export default NotFound
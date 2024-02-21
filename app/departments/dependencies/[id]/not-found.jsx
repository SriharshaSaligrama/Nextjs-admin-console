import DefaultNotFound from '@/app/ui/NotFound'
import React from 'react'

const NotFound = () => {
    return (
        <DefaultNotFound
            entity={'department'}
            returnLink={'/departments'}
            returnPageName={'Departments'}
        />
    )
}

export default NotFound
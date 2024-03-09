import DefaultNotFound from '@/app/_lib/components/ui/notfound'
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
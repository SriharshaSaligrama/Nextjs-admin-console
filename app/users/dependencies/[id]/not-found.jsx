import DefaultNotFound from '@/app/_lib/components/ui/notfound'
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
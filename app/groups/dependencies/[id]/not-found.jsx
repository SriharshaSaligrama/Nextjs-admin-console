import DefaultNotFound from '@/app/_lib/components/ui/notfound'
import React from 'react'

const NotFound = () => {
    return (
        <DefaultNotFound
            entity={'group'}
            returnLink={'/groups'}
            returnPageName={'Groups'}
        />
    )
}

export default NotFound
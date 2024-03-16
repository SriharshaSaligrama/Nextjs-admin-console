import DefaultNotFound from '@/app/_lib/components/ui/notfound'
import React from 'react'

const NotFound = () => {
    return (
        <DefaultNotFound
            entity={'notification mapping'}
            returnLink={'/notifications'}
            returnPageName={'Notifications mapping'}
        />
    )
}

export default NotFound
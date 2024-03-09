import DefaultNotFound from '@/app/_lib/components/ui/notfound'
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
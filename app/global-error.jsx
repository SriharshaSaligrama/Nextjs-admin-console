'use client'

import React from 'react'
import DefaultError from '@/app/_lib/components/ui/error'

const Error = ({ error, reset }) => {
    return (
        <DefaultError error={error} reset={reset} />
    )
}

export default Error
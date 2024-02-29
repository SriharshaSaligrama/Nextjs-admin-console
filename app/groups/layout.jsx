import React from 'react'

const Layout = ({ children, modal }) => {
    return (<>
        {children}
        {modal}
    </>)
}

export default Layout
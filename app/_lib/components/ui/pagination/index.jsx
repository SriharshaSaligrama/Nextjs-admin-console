import React from 'react'
import { Pagination as MuiPagination } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation';
import useSetCurrentPage from './hook';
import handleChange from './utils';

const Pagination = ({ totalPages, currentPage, returnLink, sx }) => {
    const router = useRouter();

    const searchParams = useSearchParams();

    const { page, setPage } = useSetCurrentPage({ currentPage, searchParams });

    return (
        <MuiPagination
            count={totalPages}
            sx={{ ...styles.align, ...sx }}
            page={page}
            onChange={(event, value) => handleChange(event, value, { setPage, searchParams, router, returnLink })}
        />
    )
}

export default Pagination

const styles = {
    align: {
        display: 'flex',
        justifyContent: 'center',
    },
}
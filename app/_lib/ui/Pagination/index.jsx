import React, { useEffect, useState } from 'react'
import { Pagination as MuiPagination } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation';

const Pagination = ({ totalPages, currentPage, sx }) => {
    const router = useRouter();

    const searchParams = useSearchParams();

    const queryPage = searchParams.get('page')

    const [page, setPage] = useState(+currentPage || 1);

    useEffect(() => {
        if (queryPage) {
            setPage(+queryPage)
        }
    }, [queryPage]);

    const handleChange = (event, value) => {
        setPage(+value);
        const params = new URLSearchParams(searchParams);
        params.set('page', value.toString());
        router.push(`/groups?${params.toString()}`);
    };

    return (
        <MuiPagination
            count={totalPages}
            sx={{ ...styles.align, ...sx }}
            page={page}
            onChange={handleChange}
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
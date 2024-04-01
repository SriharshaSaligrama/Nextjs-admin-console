const { useState, useEffect } = require("react");

const useSetCurrentPage = ({ currentPage, searchParams }) => {
    const queryPage = searchParams.get('page')

    const [page, setPage] = useState(+currentPage || 1);

    useEffect(() => {
        if (queryPage) {
            setPage(+queryPage)
        }
    }, [queryPage]);

    return { page, setPage }
}

export default useSetCurrentPage
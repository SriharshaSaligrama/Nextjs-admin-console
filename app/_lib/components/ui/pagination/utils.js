const setParams = ({ value, searchParams, router, returnLink }) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', value.toString());
    router.push(`${returnLink}?${params.toString()}`);
};

const handleChange = (event, value, { setPage, searchParams, router, returnLink }) => {
    setPage(+value);
    setParams({ value, searchParams, router, returnLink });
};

export default handleChange
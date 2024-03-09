export const mongoErrorHandler = ({ errorProneFields, mongoError }) => {
    if (mongoError?.error) {
        throw new Error(mongoError?.error?.message)
    } else if (mongoError?.message) {
        throw new Error(mongoError?.message)
    } else if (errorProneFields?.length > 0) {
        for (const errorProneField of errorProneFields) {
            if (mongoError?.errors?.[errorProneField]) {
                throw new Error(mongoError?.errors?.[errorProneField]?.message)
            }
        }
    } else if (mongoError?.errors?.message) {
        throw new Error(mongoError?.errors?.message)
    }
}

export const getFormDataObject = (formData) => {
    const formObject = Object.fromEntries(formData.entries())
    return formObject
}

export const submitFormData = async (formData, dispatch) => {
    await dispatch(formData);
}

export const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export const handleSearch = debounce(({ term, query, setQuery }) => {
    if (term && term?.toLowerCase() !== query?.toLowerCase()) {
        setQuery(term)
    } else {
        setQuery('')
    }
}, 500)

export const getSkipCount = ({ currentPage, itemsPerPage }) => {
    return (currentPage - 1) * itemsPerPage
}

export const filterChildren = (item, allItems) => {  //used in departments and categories for getting parent departments
    const children = []

    const recursiveFilter = (item) => {
        children.push(String(item?.id), item?.name)
        const descendants = allItems?.filter(child => child?.parent?.id?.toString() === item?.id?.toString())
        for (let child of descendants) {
            recursiveFilter(child)
        }
    }

    recursiveFilter(item)

    const parentItems = allItems.filter(parent => !children.includes(String(parent?.id)))
    return JSON.parse(JSON.stringify(parentItems))
}
import { ITEMS_PER_PAGE } from "./constants"

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

export const getSkipCount = (currentPageNumber) => {
    return (currentPageNumber - 1) * ITEMS_PER_PAGE
}
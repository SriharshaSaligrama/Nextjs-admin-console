export const mongoErrorHandler = ({ errorProneFields, mongoError }) => {
    for (const errorProneField of errorProneFields) {
        if (mongoError?.errors?.[errorProneField]) {
            throw new Error(mongoError?.errors?.[errorProneField]?.message)
        } else if (mongoError?.errors?.message) {
            throw new Error(mongoError?.errors?.message)
        }
    }
}

export const getFormDataObject = (formData) => {
    const formObject = Object.fromEntries(formData.entries())
    return formObject
}
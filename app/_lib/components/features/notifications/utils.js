export const textFieldsProps = ({ notifications, dispatch, errors, categories, departments, groups }) => [
    {
        label: 'Select categories',
        value: notifications?.categories,
        onChange: (event) => dispatch({
            type: 'handleCategoriesChange',
            categories: event?.target?.value
        }),
        error: errors?.categories?.length > 0,
        helperText: errors?.categories,
        options: categories || [],
    },
    {
        label: 'Select departments',
        value: notifications?.departments,
        onChange: (event) => dispatch({
            type: 'handleDepartmentsChange',
            departments: event?.target?.value
        }),
        error: errors?.departments?.length > 0,
        helperText: errors?.departments,
        options: departments || [],
        disabled: notifications?.groups?.length > 0,
    },
    {
        label: 'Select groups',
        value: notifications?.groups,
        onChange: (event) => dispatch({
            type: 'handleGroupsChange',
            groups: event?.target?.value
        }),
        error: errors?.groups?.length > 0,
        helperText: errors?.groups,
        options: groups || [],
        disabled: notifications?.departments?.length > 0,
    }
]

export const formValidator = ({ locations, setErrors, setPending, notifications }) => {
    if (!locations?.length) {
        setErrors({
            services: '',
            notificationType: '',
            categories: '',
            departments: '',
            groups: '',
            locations: 'No buildings added. Please add a building to continue.',
            buildings: 'No buildings added. Please add a building to continue.'
        })
        setPending(false)
        return
    }
    else if (notifications?.selectedLocation && !notifications?.selectedLocationBuildings?.length) {
        setErrors({
            services: '',
            notificationType: '',
            categories: '',
            departments: '',
            groups: '',
            locations: '',
            buildings: 'The selected location should have at least one building'
        })
        setPending(false)
        return
    } else if (
        notifications?.locations?.length === 0 &&
        notifications?.selectedLocation &&
        notifications?.selectedLocationBuildings?.length
    ) {
        setErrors({
            services: '',
            notificationType: '',
            categories: '',
            departments: '',
            groups: '',
            locations: '',
            buildings: 'Add the selected location and buildings to buildings list',
        })
        setPending(false)
        return
    }
}
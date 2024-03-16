export const defaultNotifications = {
    id: null,
    services: [
        {
            name: "Asset Management",
            notificationType: {
                sms: false,
                email: false
            },
            isActive: false
        },
        {
            name: "Fault Reports",
            notificationType: {
                sms: false,
                email: false
            },
            isActive: false
        },
    ],
    categories: [],
    departments: [],
    groups: [],
    locations: [],
    selectedLocation: '',
    selectedLocationBuildings: []
}

export const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'setEditNotification': {
            return {
                ...state,
                ...action?.data
            }
        }
        case 'handleCheckBoxChange': {
            return {
                ...state,
                services: state?.services?.map((service) => {
                    if (service?.name === action?.name) {
                        return {
                            ...service,
                            isActive: action?.isActive
                        }
                    }
                    return service
                })
            }
        }
        case 'handleNotificationTypeChange': {
            return {
                ...state,
                services: state?.services?.map((service) => {
                    if (service?.name === action?.name) {
                        return {
                            ...service,
                            notificationType: {
                                ...service?.notificationType,
                                [action?.notificationType]: action?.isActive
                            }
                        }
                    }
                    return service
                })
            }
        }
        case 'handleCategoriesChange': {
            return {
                ...state,
                categories: typeof action?.categories === 'string' ? action?.categories.split(',') : action?.categories,
            }
        }
        case 'handleDepartmentsChange': {
            return {
                ...state,
                departments: typeof action?.departments === 'string' ? action?.departments.split(',') : action?.departments,
                groups: [],
                locations: [],
            }
        }
        case 'handleGroupsChange': {
            return {
                ...state,
                groups: typeof action?.groups === 'string' ? action?.groups.split(',') : action?.groups,
                departments: [],
            }
        }
        case 'handleSelectedLocationChange': {
            return {
                ...state,
                selectedLocation: action?.selectedLocation,
                selectedLocationBuildings: []
            }
        }
        case 'handleSelectedLocationBuildingsChange': {
            const selectedLocationBuildings = typeof action?.buildings === 'string' ? action?.buildings.split(',') : action?.buildings

            return {
                ...state,
                selectedLocationBuildings
            }
        }
        case 'handleAddToBuildingsListButtonClick': {
            //if location is already in the list, update only the buildings list of that location, else add the location and the buildings list
            if (state?.locations?.find(location => location?.location === action?.location)) {
                return {
                    ...state,
                    locations: state?.locations?.map(location => {
                        if (location?.location === action?.location) {
                            return {
                                ...location,
                                buildings: [...action.buildings]
                            }
                        }
                        return location
                    }),
                    selectedLocation: '',
                    selectedLocationBuildings: []
                }
            }
            return {
                ...state,
                locations: [...state.locations, {
                    location: state.selectedLocation,
                    buildings: state.selectedLocationBuildings
                }],
                selectedLocation: '',
                selectedLocationBuildings: []
            }
        }
        case 'handleRemoveFromBuildingsListButtonClick': {
            return {
                ...state,
                locations: state?.locations?.filter(location => location?.location !== action?.location),
            }
        }
        default: {
            return state
        }
    }
}
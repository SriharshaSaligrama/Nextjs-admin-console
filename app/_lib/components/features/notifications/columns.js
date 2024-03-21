import NotifcationsDataTableActions from "./NotifcationsDataTableActions"

export const notificationMappingsColumns = [
    {
        field: 'services',
        headerName: 'Services',
        width: 250,
        editable: false,
        valueGetter: (params) => {
            if (params.row.services?.length > 0) {
                const notificationType = (service) => {
                    return service?.notificationType?.sms && service?.notificationType?.email ? 'sms, email' :
                        service?.notificationType?.sms && !service?.notificationType?.email ? 'sms' :
                            service?.notificationType?.email && !service?.notificationType?.sms ? 'email' : ''
                }
                return params.row?.services?.map((service) => notificationType(service) && `${service?.name} (${notificationType(service)})`)?.filter(Boolean)?.join(', ')
            }
        }
    },
    {
        field: 'categories',
        headerName: 'Categories',
        width: 200,
        editable: false,
        valueGetter: (params) => {
            if (params.row.categories?.length > 0) {
                return params.row.categories?.map((category) => category?.name).join(', ')
            }
        }
    },
    {
        field: 'departments',
        headerName: 'Departments',
        width: 200,
        editable: false,
        valueGetter: (params) => {
            if (params.row.departments?.length > 0) {
                return params.row.departments?.map((department) => department?.name).join(', ')
            }
        }
    },
    {
        field: 'groups',
        headerName: 'Groups',
        width: 200,
        editable: false,
        valueGetter: (params) => {
            if (params.row.groups?.length > 0) {
                return params.row.groups?.map((group) => group?.name).join(', ')
            }
        }
    },
    {
        field: 'locations',
        headerName: 'Locations',
        width: 200,
        editable: false,
        valueGetter: (params) => {
            if (params.row.locations?.length > 0) {
                return params.row.locations?.map((location) => location?.location?.name).join(', ')
            }
        }
    },
    {
        field: 'buildings',
        headerName: 'Buildings',
        width: 200,
        editable: false,
        valueGetter: (params) => {
            if (params.row.locations?.length > 0) {
                return params.row.locations?.flatMap((location) => location?.buildings?.map((building) => building?.name))?.join(', ')
            }
        }
    },
    {
        field: 'Actions',
        renderCell: (cellValues) => (<NotifcationsDataTableActions cellValues={cellValues} showViewButton />),
        width: 150,
        editable: false,
    },
]
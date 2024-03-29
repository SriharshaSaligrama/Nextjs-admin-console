import { AccountTreeOutlined, ApartmentOutlined, ForwardToInboxOutlined, GridViewOutlined, GroupsOutlined, ManageAccountsOutlined, NotificationsOutlined, RoomOutlined } from "@mui/icons-material";
import DataTableActions from "./components/features/featurehome/DataTableActions";
import { addEditDepartmentAction, deleteDepartmentAction } from "./db/departments/actions";
import { addEditCategoryAction, deleteCategoryAction } from "./db/categories/actions";

export const navbarListItems = [
    {
        title: 'Locations',
        icon: <RoomOutlined />,
        path: '/locations',
    },
    {
        title: 'Buildings',
        icon: <ApartmentOutlined />,
        path: '/buildings',
    },
    {
        title: 'Departments',
        icon: <AccountTreeOutlined />,
        path: '/departments',
    },
    {
        title: 'Users',
        icon: <ManageAccountsOutlined />,
        path: '/users',
    },
    {
        title: 'Groups',
        icon: <GroupsOutlined />,
        path: '/groups',
    },
    {
        title: 'External emails',
        icon: <ForwardToInboxOutlined />,
        path: '/externalemails',
    },
    {
        title: 'Categories',
        icon: <GridViewOutlined />,
        path: '/categories',
    },
    {
        title: 'Notifications',
        icon: <NotificationsOutlined />,
        path: '/notifications',
    },
]

export const departmentColumns = [
    {
        field: 'name',
        headerName: 'Department name',
        width: 250,
        editable: false,
    },
    {
        field: 'code',
        headerName: 'Department code',
        width: 150,
        editable: false,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 250,
        editable: false,
    },
    {
        field: 'parent',
        headerName: 'Parent department',
        width: 150,
        editable: false,
        valueGetter: (params) => {
            if (params.row.parent) {
                return params.row.parent.name
            }
        }
    },
    {
        field: 'Actions',
        renderCell: (cellValues) => (<DataTableActions cellValues={cellValues} />),
        width: 150,
        editable: false,
    },
]

export const categoryColumns = [
    {
        field: 'name',
        headerName: 'Category name',
        width: 250,
        editable: false,
    },
    {
        field: 'code',
        headerName: 'Category code',
        width: 150,
        editable: false,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 250,
        editable: false,
    },
    {
        field: 'parent',
        headerName: 'Parent category',
        width: 150,
        editable: false,
        valueGetter: (params) => {
            if (params.row.parent) {
                return params.row.parent.name
            }
        }
    },
    {
        field: 'Actions',
        renderCell: (cellValues) => (<DataTableActions cellValues={cellValues} />),
        width: 150,
        editable: false,
    },
]

export const userColumns = [
    {
        field: 'fullName',
        headerName: 'Name',
        width: 250,
        editable: false,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
        editable: false,
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 150,
        editable: false,
    },
    {
        field: 'buildingAssignedTo',
        headerName: 'Building',
        width: 150,
        editable: false,
        valueGetter: (params) => {
            if (params.row.buildingAssignedTo) {
                return params.row.buildingAssignedTo?.name
            }
        }
    },
    {
        field: 'managingBuildings',
        headerName: 'Buildings Managing',
        width: 250,
        editable: false,
        valueGetter: (params) => {
            if (params.row.managingBuildings?.length > 0) {
                return params.row.managingBuildings?.map((building) => building.name).join(', ')
            }
        }
    },
    {
        field: 'departmentAssignedTo',
        headerName: 'Department',
        width: 150,
        editable: false,
        valueGetter: (params) => {
            if (params.row.departmentAssignedTo) {
                return params.row.departmentAssignedTo?.name
            }
        }
    },
    {
        field: 'Actions',
        renderCell: (cellValues) => (<DataTableActions cellValues={cellValues} />),
        width: 150,
        editable: false,
    },
]

export const locationColumns = [
    {
        field: 'name',
        headerName: 'Name',
        width: 700,
        editable: false,
    },
    {
        field: 'Actions',
        renderCell: (cellValues) => (<DataTableActions cellValues={cellValues} />),
        width: 700,
        editable: false,
    },
]

export const buildingColumns = [
    {
        field: 'name',
        headerName: 'Building name',
        width: 250,
        editable: false,
    },
    {
        field: 'Location name',
        width: 250,
        editable: false,
        valueGetter: (params) => {
            if (params.row.location) {
                return params.row.location.name
            }
        }
    },
    {
        field: 'Actions',
        renderCell: (cellValues) => (<DataTableActions cellValues={cellValues} />),
        width: 150,
        editable: false,
    },
]

export const externalEmailsColumns = [
    {
        field: 'id',
        headerName: 'Email',
        width: 400,
        editable: false,
    },
]

export const notificationsColumns = [
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
        renderCell: (cellValues) => (<DataTableActions cellValues={cellValues} showViewButton />),
        width: 150,
        editable: false,
    },
]

export const userRoles = ["admin", "employee", "facility manager"]

export const pageMappings = [
    {
        keyword: 'departments',
        heading: 'Departments',
        returnLink: 'departments',
        addButtonLabel: 'Department',
        columns: departmentColumns
    },
    {
        keyword: 'categories',
        heading: 'Categories',
        returnLink: 'categories',
        addButtonLabel: 'Category',
        columns: categoryColumns
    },
    {
        keyword: 'locations',
        heading: 'Locations',
        returnLink: 'locations',
        addButtonLabel: 'Location',
        columns: locationColumns
    },
    {
        keyword: 'buildings',
        heading: 'Buildings',
        returnLink: 'buildings',
        addButtonLabel: 'Building',
        columns: buildingColumns
    },
    {
        keyword: 'users',
        heading: 'Users',
        returnLink: 'users',
        addButtonLabel: 'User',
        columns: userColumns
    },
    {
        keyword: 'groups',
        heading: 'Groups',
        returnLink: 'groups',
        addButtonLabel: 'Group',
        columns: []
    },
    {
        keyword: 'notifications',
        heading: 'Notifications mapping',
        returnLink: 'notifications',
        addButtonLabel: 'Notification Map',
        columns: notificationsColumns
    },
];

export const dataTableActionsPageLinks = {
    'departments': 'departments',
    'categories': 'categories',
    'locations': 'locations',
    'buildings': 'buildings',
    'users': 'users',
    'notifications': 'notifications'
};

export const departmentCategoryDeletePageDetails = {
    'departments': {
        label: 'department',
        childrenLabel: 'departments',
        heading: 'Department',
        returnLink: '/departments',
        deleteAction: deleteDepartmentAction
    },
    'categories': {
        label: 'category',
        childrenLabel: 'categories',
        heading: 'Category',
        returnLink: '/categories',
        deleteAction: deleteCategoryAction
    },
};

export const departmentCategoryAddEditFormPageDetails = {
    'departments': {
        heading: 'Department',
        returnLink: '/departments',
        addEditAction: addEditDepartmentAction,
    },
    'categories': {
        heading: 'Category',
        returnLink: '/categories',
        addEditAction: addEditCategoryAction,
    },
};

export const groupMembersTableHeaderColumns = [
    {
        id: 'email',
        label: 'Email',
    },
    {
        id: 'type',
        label: 'Type',
    }
]

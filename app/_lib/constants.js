import { AccountTreeOutlined, ApartmentOutlined, ForwardToInboxOutlined, GridViewOutlined, GroupsOutlined, ManageAccountsOutlined, NotificationsOutlined, RoomOutlined, SpaceDashboardOutlined } from "@mui/icons-material";
import DataTableActions from "../_lib/ui/FeatureHome/DataTableActions";
import { addDepartmentAction, deleteDepartmentAction, editDepartmentAction } from "./db/departments/actions";
import { addCategoryAction, deleteCategoryAction, editCategoryAction } from "./db/categories/actions";

export const navbarListItems = [
    {
        title: 'Dashboard',
        icon: <SpaceDashboardOutlined />,
        path: '/',
    },
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
];

export const dataTableActionsPageLinks = {
    'departments': 'departments',
    'categories': 'categories',
    'locations': 'locations',
    'buildings': 'buildings',
    'users': 'users',
};

export const departmentCategoryDeletePageDetails = {
    'departments': {
        label: 'department',
        childrenLabel: 'departments',
        returnLink: '/departments',
        deleteAction: deleteDepartmentAction
    },
    'categories': {
        label: 'category',
        childrenLabel: 'categories',
        returnLink: '/categories',
        deleteAction: deleteCategoryAction
    },
};

export const departmentCategoryAddEditFormPageDetails = {
    'departments': {
        heading: 'Department',
        returnLink: '/departments',
        addAction: addDepartmentAction,
        editAction: editDepartmentAction
    },
    'categories': {
        heading: 'Category',
        returnLink: '/categories',
        addAction: addCategoryAction,
        editAction: editCategoryAction
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

export const ITEMS_PER_PAGE = 6

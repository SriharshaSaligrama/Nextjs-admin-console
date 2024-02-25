import { AccountTreeOutlined, ApartmentOutlined, ForwardToInboxOutlined, GridViewOutlined, GroupsOutlined, ManageAccountsOutlined, NotificationsOutlined, RoomOutlined, SpaceDashboardOutlined } from "@mui/icons-material";
import DataTableActions from "../_lib/ui/FeatureHome/DataTableActions";

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
        title: 'User Management',
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
        width: 250,
        editable: false,
    },
    {
        field: 'buildingAssignedTo',
        headerName: 'Building',
        width: 150,
        editable: false,
    },
    {
        field: 'managingBuildings',
        headerName: 'Building Managing',
        width: 150,
        editable: false,
    },
    {
        field: 'departmentAssignedTo',
        headerName: 'Department',
        width: 150,
        editable: false,
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
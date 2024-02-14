import { AccountTreeOutlined, ForwardToInboxOutlined, GridViewOutlined, GroupsOutlined, ManageAccountsOutlined, NotificationsOutlined } from "@mui/icons-material";
import DataTableActions from "../ui/DepartmentCategory/DataTableActions";

export const navbarListItems = [
    {
        title: 'User Management',
        icon: <ManageAccountsOutlined />,
        path: '/',
    },
    {
        title: 'Departments',
        icon: <AccountTreeOutlined />,
        path: '/departments',
    },
    {
        title: 'Categories',
        icon: <GridViewOutlined />,
        path: '/categories',
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
'use client'

import React, { useState } from 'react'
import { useFormState } from 'react-dom';
import { Box, List, ListItem, ListItemText, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { usePathname } from 'next/navigation'
import globalStyles from '@/app/globalStyles'
import PageHeading from '../../ui/pageheading'
import DeleteCancelButtons from '../../ui/deletecancelbuttons'
import { departmentCategoryDeletePageDetails } from '../../../constants'
import { submitFormData } from '../../../utils'
import { ViewNotificationMapping } from '../notifications/View';

const Delete = (props) => {
    const { deletingData, childrenData, parentData, usersData, notificationsData } = props
    const pathname = usePathname();
    const currentPage = departmentCategoryDeletePageDetails[pathname.split('/')[1]] || {
        label: '',
        childrenLabel: '',
        heading: '',
        returnLink: '',
        deleteAction: () => { }
    };
    const { label, childrenLabel, heading, returnLink, deleteAction } = currentPage
    const [parent, setParent] = useState('')
    const transferringParent = parentData?.find((data) => data.id === parent)
    const ifUsersOfDeletingDepartmentExist = pathname.includes('departments') && usersData?.length > 0
    const initialState = { id: deletingData?.id, parentId: parent, userExists: ifUsersOfDeletingDepartmentExist, notificationExists: notificationsData?.length > 0 }
    const [state, dispatch] = useFormState(deleteAction, initialState);

    return (
        <Stack spacing={2}>
            <PageHeading heading={`Delete ${heading}`} />
            {
                (childrenData?.length > 0 || ifUsersOfDeletingDepartmentExist || notificationsData?.length > 0) ? <Stack sx={{ ...styles.dependenciesContainer }}>
                    <Stack spacing={2} sx={{ ...styles.dependenciesStack }}>
                        {
                            childrenData?.length > 0 && <>
                                <Typography><b>{deletingData.name}</b> {label} has <b>{childrenData.length}</b> children {label}(s):</Typography>
                                <List sx={{ ...styles.childList }}>
                                    {
                                        childrenData.map((child) => (
                                            <ListItem key={child.id} sx={{ ...styles.childListItem }}>
                                                <ListItemText primary={child.name} />
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            </>
                        }
                        {
                            ifUsersOfDeletingDepartmentExist && <>
                                <Typography><b>{deletingData.name}</b> {label} has <b>{usersData.length}</b> user(s):</Typography>
                                <List sx={{ ...styles.childList }}>
                                    {
                                        usersData.map((user) => (
                                            <ListItem key={user?.id} sx={{ ...styles.childListItem }}>
                                                <ListItemText primary={user?.fullName} />
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            </>
                        }
                        {
                            notificationsData?.length > 0 && <>
                                <Typography><b>{deletingData.name}</b> {label} has <b>{notificationsData.length}</b> notification mapping(s):</Typography>
                                <Stack sx={{ ...styles.viewNotificationsMapping }} spacing={2}>
                                    {notificationsData.map((notification) => (
                                        <ViewNotificationMapping notificationMap={notification} key={notification?.id} hideHeader />
                                    ))}
                                </Stack>
                            </>
                        }
                        {
                            (parentData?.length > 0) ? <>
                                <Typography>Please select a {label} from the list to which you need to transfer the children {childrenLabel} / notification mapping(s) {(childrenData?.length === 0 || notificationsData?.length === 0) && '(if any)'} {ifUsersOfDeletingDepartmentExist && 'and the user(s)'}</Typography>
                                <TextField
                                    select
                                    name='parent'
                                    size='small'
                                    value={parent}
                                    onChange={(event) => { setParent(event.target.value); state.parentId = event.target.value }}
                                >
                                    {
                                        parentData?.map((parent) => (
                                            <MenuItem key={parent.id} value={parent.id}>{parent.name}</MenuItem>
                                        ))
                                    }
                                </TextField>
                            </> : <>
                                <Typography maxWidth={'650px'}>There are no parent {childrenLabel} available to transfer the above children {childrenLabel} / notification mapping(s) {(childrenData?.length === 0 || notificationsData?.length === 0) && '(if any)'} {ifUsersOfDeletingDepartmentExist && 'and the user(s)'}.</Typography>
                                <Typography maxWidth={'650px'}>Please either add a new parent {label} to transfer the above children {childrenLabel} / notification mapping(s) {(childrenData?.length === 0 || notificationsData?.length === 0) && '(if any)'} {ifUsersOfDeletingDepartmentExist && 'and the user(s)'} or delete the above children {childrenLabel}/ notification mapping(s) {ifUsersOfDeletingDepartmentExist && 'and remove the assigned department of the user(s)'} and then delete the <b>{deletingData.name}</b> {label}</Typography>
                            </>
                        }
                        {
                            parent && <>
                                <Typography>The children {childrenLabel} / notification mapping(s) {(childrenData?.length === 0 || notificationsData?.length === 0) && '(if any)'} {ifUsersOfDeletingDepartmentExist && 'and the user(s)'} listed above will be transferred to <b>{transferringParent?.name}</b> {label}</Typography>
                                <Typography>Are you sure to delete <b>{deletingData.name}</b> {label}?</Typography>
                            </>
                        }
                        <Box
                            component="form"
                            action={() => submitFormData(state, dispatch)}
                            noValidate
                            autoComplete="off"
                        >
                            <DeleteCancelButtons returnLink={returnLink} disabled={!parent} />
                        </Box>
                    </Stack>
                </Stack> : <Stack spacing={4} sx={{ ...styles.noDependenciesContainer }} >
                    <Typography><b>{deletingData.name}</b> {label} has no dependencies</Typography>
                    <Typography>Are you sure you want to delete <b>{deletingData.name}</b> {label}?</Typography>
                    <Box
                        component="form"
                        action={() => submitFormData(state, dispatch)}
                        noValidate
                        autoComplete="off"
                    >
                        <DeleteCancelButtons returnLink={returnLink} />
                    </Box>
                </Stack>
            }
        </Stack>
    )
}

export default Delete

const styles = {
    dependenciesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDependenciesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80dvh'
    },
    dependenciesStack: {
        overflow: 'auto',
        ...globalStyles.thinScrollBar
    },
    childList: {
        margin: 0,
        padding: 0,
        paddingLeft: 2,
        maxHeight: '250px',
        overflow: 'auto',
        ...globalStyles.thinScrollBar
    },
    childListItem: {
        margin: 0,
        padding: 0,
        paddingBottom: 1
    },
    viewNotificationsMapping: {
        maxHeight: '220px',
        overflow: 'auto',
        p: 2,
        ...globalStyles.thinScrollBar
    }
}
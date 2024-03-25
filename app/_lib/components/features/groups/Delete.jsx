'use client'

import React, { useState } from 'react'
import { useFormState } from 'react-dom';
import { Box, MenuItem, Stack, TextField, Typography } from '@mui/material'
import PageHeading from '../../ui/pageheading'
import { submitFormData } from '../../../utils'
import { deleteGroupAction } from '@/app/_lib/db/groups/actions';
import DeleteCancelButtons from '../../ui/deletecancelbuttons';
import { ViewNotificationMapping } from '../notifications/View';
import globalStyles from '@/app/globalStyles';

const DeleteGroup = (props) => {
    const { deletingData, groupsData, restOfGroups, notificationsData } = props

    const [transferringGroup, setTransferringGroup] = useState('')

    const transferringGroupData = groupsData?.find((group) => group.id === transferringGroup)

    const initialState = { id: deletingData?.id, transferringGroupId: transferringGroup }

    const [state, dispatch] = useFormState(deleteGroupAction, initialState);

    return (
        <Stack spacing={2}>
            <PageHeading heading='Delete Group' />
            {
                notificationsData?.length > 0 ? <Stack spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Stack spacing={2}>
                        <Typography><b>{deletingData.name}</b> group has <b>{notificationsData.length}</b> notification mapping(s):</Typography>
                        <Stack sx={{ ...styles.viewNotificationsMapping }} spacing={2}>
                            {notificationsData.map((notification) => (
                                <ViewNotificationMapping notificationMap={notification} key={notification?.id} hideHeader />
                            ))}
                        </Stack>
                        {restOfGroups?.length > 0 ? <>
                            <Typography>Please select a group from the list to which you need to transfer the notification mapping(s) to</Typography>
                            <TextField
                                select
                                name='group'
                                size='small'
                                value={transferringGroup}
                                onChange={(event) => { setTransferringGroup(event.target.value); state.transferringGroupId = event.target.value }}
                            >
                                {
                                    restOfGroups?.map((group) => (
                                        <MenuItem key={group?.id} value={group?.id}>{group?.name}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </> : <>
                            <Typography>There are no other groups available to transfer the above listed notification mapping(s).</Typography>
                            <Typography>Please either add a new group to transfer the above listed notification mapping(s) or delete the above listed notification mapping(s) and then delete the <b>{deletingData.name}</b> group</Typography>
                        </>}
                        {
                            transferringGroup && <>
                                <Typography>The notification mapping(s) listed above will be transferred to <b>{transferringGroupData?.name}</b> group</Typography>
                                <Typography>Are you sure to delete <b>{deletingData.name}</b> group?</Typography>
                            </>
                        }
                        <Box
                            component="form"
                            action={() => submitFormData(state, dispatch)}
                            noValidate
                            autoComplete="off"
                        >
                            <DeleteCancelButtons returnLink='/groups' disabled={!transferringGroup} />
                        </Box>
                    </Stack>
                </Stack> : <Stack spacing={4} sx={{ ...styles.noDependenciesContainer }}>
                    <Typography><b>{deletingData.name}</b> group has no dependencies.</Typography>
                    <Typography>Are you sure to delete the group <b>{deletingData?.name}</b>?</Typography>
                    <Box
                        component="form"
                        action={() => submitFormData(state, dispatch)}
                        noValidate
                        autoComplete="off"
                    >
                        <DeleteCancelButtons returnLink='/groups' />
                    </Box>
                </Stack>
            }
        </Stack>
    )
}

export default DeleteGroup

const styles = {
    noDependenciesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80dvh'
    },
    viewNotificationsMapping: {
        maxHeight: '220px',
        overflow: 'auto',
        p: 2,
        ...globalStyles.thinScrollBar
    }
}
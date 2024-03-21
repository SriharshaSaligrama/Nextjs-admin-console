'use client'

import React from 'react'
import { useFormState } from 'react-dom';
import { Box, Stack, Typography } from '@mui/material'
import DeleteCancelButtons from '../../ui/deletecancelbuttons'
import { submitFormData } from '@/app/_lib/utils'
import { deleteNotificationAction } from '@/app/_lib/db/notifications/actions';

const DeleteNotificationMap = (props) => {
    const { deletingData } = props

    const initialState = { id: deletingData?.id }

    const [state, dispatch] = useFormState(deleteNotificationAction, initialState);

    return (
        <Stack sx={{ ...styles.noDependenciesContainer }} spacing={2}>
            <Typography sx={{ ...styles.confirmTypography }}>
                Are you sure you want to delete the notification mapping between category(ies)
                {<b> {deletingData?.categories?.map(category => category.name)?.join(', ')}</b>} and
                {
                    deletingData?.departments?.length > 0 ?
                        <> department(s): <b>{deletingData?.departments?.map(department => department.name)?.join(', ')}</b></> :
                        <> group(s): <b>{deletingData?.groups?.map(group => group.name)?.join(', ')}</b></>
                }?
            </Typography>
            <Box
                component="form"
                action={() => submitFormData(state, dispatch)}
                noValidate
                autoComplete="off"
            >
                <DeleteCancelButtons returnLink='/notifications' />
            </Box>
        </Stack>)
}

export default DeleteNotificationMap


const styles = {
    noDependenciesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80dvh'
    },
    confirmTypography: {
        fontSize: '16px',
        textAlign: 'center',
        maxWidth: '500px',
    }
}
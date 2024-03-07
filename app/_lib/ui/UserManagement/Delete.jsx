'use client'

import React from 'react'
import { useFormState } from 'react-dom';
import PageHeading from '../PageHeading'
import { Box, Stack, Typography } from '@mui/material'
import DeleteCancelButtons from '../DeleteCancelButtons'
import { useRouter } from 'next/navigation'
import { submitFormData } from '../../utils'
import { deleteUserAction } from '../../db/user/actions';

const DeleteUser = (props) => {
    const { deletingData } = props

    const router = useRouter()

    const handleCancelClick = () => {
        router.push('/users')
    }

    const initialState = { id: deletingData?.id }

    const [state, dispatch] = useFormState(deleteUserAction, initialState);

    return (
        <>
            <PageHeading heading='Delete User' />
            <Stack sx={{ ...styles.container }} spacing={2}>
                <Typography >If the user is a member of any of the groups, the user will be removed from those groups.</Typography>
                <Typography>Are you sure to delete the user <b>{deletingData?.fullName}</b>?</Typography>
                <Box
                    component="form"
                    action={() => submitFormData(state, dispatch)}
                    noValidate
                    autoComplete="off"
                >
                    <DeleteCancelButtons handleCancelClick={handleCancelClick} />
                </Box>
            </Stack>
        </>
    )
}

export default DeleteUser

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80dvh'
    },
}
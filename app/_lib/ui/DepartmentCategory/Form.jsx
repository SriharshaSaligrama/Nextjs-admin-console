'use client'

import React from 'react'
import { useFormState } from 'react-dom';
import { usePathname, useRouter } from 'next/navigation';
import { Box, TextField, Stack, MenuItem } from '@mui/material'
import FormSubmitCancelButtons from '../FormSubmitCancelButtons';
import PageHeading from '../PageHeading';
import { departmentCategoryAddEditFormPageDetails } from '../../constants';
import { submitFormData } from '../../utils';

const Form = (props) => {
    const { allData, editingData } = props
    const router = useRouter()
    const pathname = usePathname();
    const currentPage = departmentCategoryAddEditFormPageDetails[pathname.split('/')[1]] || {
        heading: '',
        returnLink: '',
        addEditAction: () => { },
    };
    const { heading, returnLink, addEditAction } = currentPage;
    const initialErrorState = { name: '', code: '', message: '' }
    const [state, dispatch] = useFormState(addEditAction, initialErrorState);

    const handleCancelClick = () => {
        router.push(returnLink)
    }

    return (
        <Box
            component="form"
            action={(formData) => submitFormData(formData, dispatch)}
            noValidate
            autoComplete="off"
        >
            <Stack spacing={2}>
                <PageHeading heading={editingData?.id ? `Edit ${heading}` : `Add ${heading}`} />
                <TextField
                    name='id'
                    sx={{ display: 'none' }}
                    defaultValue={editingData?.id}
                />
                <TextField
                    required
                    label={heading ? `${heading} Name` : 'Name'}
                    name='name'
                    defaultValue={editingData?.name}
                    error={state?.name?.length > 0}
                    helperText={state?.name || ''}
                />
                <TextField
                    required
                    label={heading ? `${heading} Code` : 'Code'}
                    name='code'
                    defaultValue={editingData?.code}
                    error={state?.code?.length > 0}
                    helperText={state?.code || ''}
                />
                <TextField
                    label={heading ? `${heading} Description` : 'Description'}
                    multiline
                    rows={4}
                    name='description'
                    defaultValue={editingData?.description}
                />
                <TextField
                    label={heading ? `Parent ${heading}` : 'Parent'}
                    select
                    name='parent'
                    defaultValue={editingData?.parent?.id}
                >
                    {allData?.map((data) => (
                        <MenuItem key={data?.id} value={data?.id}>
                            {data?.name}
                        </MenuItem>
                    ))}
                </TextField>
                <FormSubmitCancelButtons
                    handleCancelClick={handleCancelClick}
                    submitText={editingData?.id ? `Update ${heading}` : `Create ${heading}`}
                    submitPendingText={editingData?.id ? `Updating ${heading}...` : `Creating ${heading}...`}
                />
            </Stack>
        </Box>
    )
}

export default Form
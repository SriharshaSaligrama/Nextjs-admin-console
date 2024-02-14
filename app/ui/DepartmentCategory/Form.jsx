'use client'

import React from 'react'
import { useFormState } from 'react-dom';
import { usePathname, useRouter } from 'next/navigation';
import { Box, TextField, Typography, Button, Stack, MenuItem } from '@mui/material'
import { addDepartmentAction, editDepartmentAction } from '@/app/lib/departments/actions';
import { addCategoryAction, editCategoryAction } from '@/app/lib/categories/actions';

const Form = (props) => {
    const { allData, editingData } = props
    const router = useRouter()
    const pathname = usePathname();
    const heading = pathname.includes('departments') ? 'Department' : pathname.includes('categories') ? 'Category' : ''
    const returnLink = pathname.includes('departments') ? '/departments' : pathname.includes('categories') ? '/categories' : ''
    const addAction = pathname.includes('departments') ? addDepartmentAction : pathname.includes('categories') ? addCategoryAction : () => { }
    const editAction = pathname.includes('departments') ? editDepartmentAction : pathname.includes('categories') ? editCategoryAction : () => { }
    const initialErrorState = { name: '', code: '', message: '' }
    const [state, dispatch] = useFormState(editingData?.id ? editAction : addAction, initialErrorState);

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(new FormData(event.target))
    }

    const handleCancelClick = () => {
        router.push(returnLink)
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Stack spacing={2}>
                <Typography sx={{ ...styles.heading }}>{editingData?.id ? `Edit ${heading}` : `Add ${heading}`}</Typography>
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
                <Box display={'flex'} justifyContent={'center'} columnGap={2}>
                    <Button sx={{ ...styles.buttons }} variant='contained' color='error' onClick={handleCancelClick}>Cancel</Button>
                    <Button sx={{ ...styles.buttons }} variant='contained' type="submit">{editingData?.id ? 'Update' : 'Create'} {heading}</Button>
                </Box>
            </Stack>
        </Box>
    )
}

export default Form

const styles = {
    heading: {
        fontSize: "24px",
        fontWeight: 600,
        paddingBottom: "16px",
    },
    buttons: {
        width: '50%',
    },
}
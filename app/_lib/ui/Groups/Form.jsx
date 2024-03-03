'use client'

import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom';
import { Autocomplete, Box, Checkbox, Stack, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import FormSubmitCancelButtons from '../FormSubmitCancelButtons'
import PageHeading from '../PageHeading'
import { debounce, submitFormData } from '../../utils';
import { addGroupAction } from '../../db/groups/actions';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { getFilteredUsersAction } from '../../db/user/actions';

const GroupsForm = (props) => {
    const { editingData } = props

    const router = useRouter()

    const initialErrorState = { name: '', code: '', members: '', message: '' }

    const [state, dispatch] = useFormState(addGroupAction, initialErrorState);

    const [users, setUsers] = useState([]);

    const [selectedEmails, setSelectedEmails] = useState(editingData?.members?.length > 0 ? editingData?.members?.map(member => member?.email) : [])

    const [query, setQuery] = useState('')

    useEffect(() => {
        const fetchUsersData = async () => {
            const usersList = await getFilteredUsersAction(query)
            setUsers(usersList)
        }

        if (query?.length > 1) {
            fetchUsersData()
        } else {
            setUsers([])
        }
    }, [query])

    const handleCancelClick = () => {
        router.push('/groups');
    }

    const handleSearch = debounce((term) => {
        if (term && term?.toLowerCase() !== query?.toLowerCase()) {
            setQuery(term)
        } else {
            setQuery('')
        }
    }, 500)

    return (
        <Box
            component="form"
            action={(formData) => submitFormData(formData, dispatch)}
            noValidate
            autoComplete="off"
        >
            <Stack spacing={2}>
                <PageHeading heading={editingData?.id ? `Edit Group` : `Add Group`} />
                <TextField
                    name='id'
                    sx={{ display: 'none' }}
                    defaultValue={editingData?.id}
                />
                <TextField
                    required
                    label={`Group Name`}
                    name='name'
                    defaultValue={editingData?.name}
                    error={state?.name?.length > 0}
                    helperText={state?.name || ''}
                />
                <TextField
                    required
                    label={`Group Code`}
                    name='code'
                    defaultValue={editingData?.code}
                    error={state?.code?.length > 0}
                    helperText={state?.code || ''}
                />
                <TextField
                    label={`Group Description`}
                    multiline
                    rows={4}
                    name='description'
                    defaultValue={editingData?.description}
                />
                <Autocomplete
                    value={selectedEmails}
                    onChange={(event, newValue) => {
                        if (newValue?.length > 0) {
                            setSelectedEmails(newValue)
                        } else if (newValue?.length === 0) {
                            setSelectedEmails([])
                        }
                    }}
                    options={users?.map((option) => option?.email)}
                    multiple
                    noOptionsText='No members found'
                    disableCloseOnSelect
                    limitTags={3}
                    freeSolo
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox
                                icon={<CheckBoxOutlineBlank />}
                                checkedIcon={<CheckBox />}
                                checked={selected}
                            />
                            {option}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Members (min. 2 characters)"
                            name='members'
                            onChange={(e) => {
                                handleSearch(e.target.value);
                            }}
                            error={state?.members?.length > 0}
                            helperText={state?.members || ''}
                        />
                    )}
                />
                <TextField
                    name='members'
                    sx={{ display: 'none' }}
                    defaultValue={JSON.stringify(selectedEmails)}
                />
                <FormSubmitCancelButtons
                    handleCancelClick={handleCancelClick}
                    submitText={editingData?.id ? `Update Group` : `Create Group`}
                    submitPendingText={editingData?.id ? `Updating Group...` : `Creating Group...`}
                />
            </Stack>
        </Box>
    )
}

export default GroupsForm
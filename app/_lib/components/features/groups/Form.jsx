'use client'

import React from 'react'
import { Autocomplete, Box, Checkbox, Stack, TextField, Tooltip } from '@mui/material'
import FormSubmitCancelButtons from '../../ui/formsubmitcancelbuttons'
import PageHeading from '../../ui/pageheading'
import { handleSearch, submitFormData } from '../../../utils';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import useAddEditGroup from './hooks/form'
import useFilteredUsers from './hooks/fetchFilteredUsers'

const GroupsForm = (props) => {
    const { editingData } = props

    const {
        state,
        dispatch,
        selectedEmails,
        setSelectedEmails,
    } = useAddEditGroup({ editingData })

    const { users, query, setQuery } = useFilteredUsers();

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
                <Tooltip title='press Enter to add the email to the members list, if adding manually'>
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
                                    handleSearch({ term: e.target.value, query, setQuery });
                                }}
                                error={state?.members?.length > 0}
                                helperText={state?.members || ''}
                            />
                        )}
                    />
                </Tooltip>
                <TextField
                    name='members'
                    sx={{ display: 'none' }}
                    defaultValue={JSON.stringify(selectedEmails)}
                />
                <FormSubmitCancelButtons
                    returnLink='/groups'
                    submitText={editingData?.id ? `Update Group` : `Create Group`}
                    submitPendingText={editingData?.id ? `Updating Group...` : `Creating Group...`}
                />
            </Stack>
        </Box>
    )
}

export default GroupsForm
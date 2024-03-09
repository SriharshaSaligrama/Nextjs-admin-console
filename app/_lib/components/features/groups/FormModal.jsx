'use client'

import React from 'react'
import { Autocomplete, Box, Button, Checkbox, Stack, TextField, Tooltip } from '@mui/material'
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import useAddEditGroupModal from './hooks/formModal';
import globalStyles from '@/app/globalStyles';
import { handleSearch } from '@/app/_lib/utils';
import useFilteredUsers from './hooks/fetchFilteredUsers';

const GroupsModalForm = (props) => {
    const { editingData } = props

    const {
        group,
        setGroup,
        errors,
        pending,
        handleChange,
        handleSubmit
    } = useAddEditGroupModal({ editingData })

    const { users, query, setQuery } = useFilteredUsers();

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{ ...styles.formContainer }}
        >
            <Stack spacing={2} mt={1}>
                <TextField
                    required
                    label={`Group Name`}
                    name='name'
                    size='small'
                    value={group?.name}
                    onChange={handleChange}
                    error={errors?.name?.length > 0}
                    helperText={errors?.name || ''}
                />
                <TextField
                    required
                    label={`Group Code`}
                    name='code'
                    size='small'
                    value={group?.code}
                    onChange={handleChange}
                    error={errors?.code?.length > 0}
                    helperText={errors?.code || ''}
                />
                <TextField
                    label={`Group Description`}
                    multiline
                    rows={4}
                    size='small'
                    name='description'
                    value={group?.description}
                    onChange={handleChange}
                />
                <Tooltip title='press Enter to add the email to the members list, if adding manually'>
                    <Autocomplete
                        value={group?.members}
                        onChange={(event, newValue) => {
                            if (newValue?.length > 0) {
                                setGroup({ ...group, members: newValue })
                            } else if (newValue?.length === 0) {
                                setGroup({ ...group, members: [] })
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
                                size='small'
                                error={errors?.members?.length > 0}
                                helperText={errors?.members || ''}
                            />
                        )}
                    />
                </Tooltip>
                <Button
                    sx={{ ...styles.buttons }}
                    variant='contained'
                    type="submit"
                    disabled={pending}
                >
                    {
                        pending ?
                            editingData?.id ? 'Updating Group...' : 'Creating Group...' :
                            editingData?.id ? 'Update Group' : 'Create Group'
                    }
                </Button>
            </Stack>
        </Box>
    )
}

export default GroupsModalForm

const styles = {
    formContainer: {
        maxHeight: '400px',
        overflow: 'auto',
        ...globalStyles.thinScrollBar
    },
    buttons: {
        width: '100%',
        fontSize: '11px',
    },
}
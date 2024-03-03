'use client'

import React from 'react'
import { Autocomplete, Box, Button, Checkbox, Stack, TextField } from '@mui/material'
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import useAddEditGroup from './formModalHook';

const GroupsModalForm = (props) => {
    const { editingData } = props

    const {
        group,
        setGroup,
        errors,
        pending,
        users,
        handleChange,
        handleSearch,
        handleSubmit
    } = useAddEditGroup({ editingData })

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Stack spacing={2}>
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
                                handleSearch(e.target.value);
                            }}
                            size='small'
                            error={errors?.members?.length > 0}
                            helperText={errors?.members || ''}
                        />
                    )}
                />
                <Button
                    sx={{ ...styles.buttons }}
                    variant='contained'
                    type="submit"
                    disabled={pending}
                >
                    {pending ? 'Creating Group...' : 'Create Group'}
                </Button>
            </Stack>
        </Box>
    )
}

export default GroupsModalForm

const styles = {
    buttons: {
        width: '100%',
        fontSize: '11px',
    },
}
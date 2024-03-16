'use client'

import React from 'react'
import { Box, Button, MenuItem, Stack, TextField } from '@mui/material'
import PageHeading from '@/app/_lib/components/ui/pageheading'
import ServiceCheckBox from './ServiceCheckBox'
import MultipleSelectTextField from './MultipleSelectTextField'
import SelectedLocationsTable from './SelectedLocationsTable'
import useNotificationMap from './hook'
import SubmitCancelButtons from './SubmitCancelButtons'

const NotificationMappingForm = (props) => {
    const { categories, departments, groups, locations, updatingNotificationMap } = props

    const {
        handleSubmit,
        notifications,
        errors,
        dispatch,
        selectedLocation,
        pending
    } = useNotificationMap({ locations, updatingNotificationMap })

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Stack spacing={2}>
                <PageHeading heading="Add Notification Mapping" />
                <ServiceCheckBox {...{ notifications, errors, dispatch }} />
                <MultipleSelectTextField
                    label='Select categories'
                    value={notifications?.categories}
                    onChange={(event) => dispatch({
                        type: 'handleCategoriesChange',
                        categories: event?.target?.value
                    })}
                    error={errors?.categories?.length > 0}
                    helperText={errors?.categories}
                    options={categories || []}
                />
                <MultipleSelectTextField
                    label='Select departments'
                    value={notifications?.departments}
                    onChange={(event) => dispatch({
                        type: 'handleDepartmentsChange',
                        departments: event?.target?.value
                    })}
                    error={errors?.departments?.length > 0}
                    helperText={errors?.departments}
                    options={departments || []}
                    disabled={notifications?.groups?.length > 0}
                />
                <MultipleSelectTextField
                    label='Select groups'
                    value={notifications?.groups}
                    onChange={(event) => dispatch({
                        type: 'handleGroupsChange',
                        groups: event?.target?.value
                    })}
                    error={errors?.groups?.length > 0}
                    helperText={errors?.groups}
                    options={groups || []}
                    disabled={notifications?.departments?.length > 0}
                />
                {
                    notifications?.groups?.length > 0 && (
                        <TextField
                            select
                            label='Select a location'
                            value={notifications?.selectedLocation || ''}
                            onChange={(event) => dispatch({
                                type: 'handleSelectedLocationChange',
                                selectedLocation: event?.target?.value,
                            })}
                            error={errors?.locations?.length > 0}
                            helperText={errors?.locations || ''}
                        >
                            {locations?.map((location) => (
                                <MenuItem key={location?.id} value={location?.id} >
                                    {location?.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )
                }
                {
                    notifications?.selectedLocation && (
                        <MultipleSelectTextField
                            label='Select buildings'
                            value={notifications?.selectedLocationBuildings}
                            onChange={(event) => dispatch({
                                type: 'handleSelectedLocationBuildingsChange',
                                buildings: event?.target?.value
                            })}
                            error={errors?.buildings?.length > 0}
                            helperText={errors?.buildings}
                            options={selectedLocation?.buildings || []}
                            disabled={notifications?.departments?.length > 0}
                        />
                    )
                }
                {
                    notifications?.selectedLocationBuildings?.length > 0 && (
                        <Button
                            variant='contained'
                            onClick={() => dispatch({
                                type: 'handleAddToBuildingsListButtonClick',
                                location: notifications?.selectedLocation,
                                buildings: notifications?.selectedLocationBuildings
                            })}
                            sx={{ width: 'fit-content' }}
                        >
                            Add to buildings list
                        </Button>
                    )
                }
                {
                    notifications?.locations?.length > 0 && (
                        <SelectedLocationsTable {...{ notifications, locations, dispatch }} />
                    )
                }
                <SubmitCancelButtons {...{ pending, updatingNotificationMap }} />
            </Stack>
        </Box>
    )
}

export default NotificationMappingForm
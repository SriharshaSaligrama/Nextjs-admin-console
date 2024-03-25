'use client'

import React from 'react'
import { Box, Button, MenuItem, Stack, TextField } from '@mui/material'
import PageHeading from '@/app/_lib/components/ui/pageheading'
import ServiceCheckBox from './ServiceCheckBox'
import MultipleSelectTextField from './MultipleSelectTextField'
import SelectedLocationsTable from './SelectedLocationsTable'
import useNotificationMap from './hook'
import FormSubmitCancelButtons from '../../ui/formsubmitcancelbuttons'
import { textFieldsProps } from './utils'

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

    const textFields = textFieldsProps({
        notifications,
        dispatch,
        errors,
        categories,
        departments,
        groups
    })

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Stack spacing={2}>
                <PageHeading
                    heading={`${updatingNotificationMap?.id ? 'Edit' : 'Add'} Notification Mapping`}
                />
                <ServiceCheckBox {...{ notifications, errors, dispatch }} />
                {textFields.map((textField) => (
                    <MultipleSelectTextField
                        key={textField?.label}
                        {...textField}
                    />
                ))}
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
                <FormSubmitCancelButtons
                    pending={pending}
                    returnLink='/notifications'
                    submitText={updatingNotificationMap?.id ?
                        'Update Notification Map' :
                        'Add Notification Map'
                    }
                    submitPendingText={updatingNotificationMap?.id ?
                        'Updating Notification Map ...' :
                        'Adding Notification Map ...'
                    }
                />
            </Stack>
        </Box>
    )
}

export default NotificationMappingForm
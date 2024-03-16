import React from 'react'
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Typography } from '@mui/material'

const ServiceCheckBox = (props) => {
    const { notifications, errors, dispatch } = props

    return (
        <>
            <Typography>Select Services:</Typography>
            {
                notifications?.services?.map((service) => (
                    <FormControl key={service?.name} error={errors?.services?.length > 0}>
                        <FormGroup >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={service?.isActive}
                                        onChange={(event) => dispatch({
                                            type: 'handleCheckBoxChange',
                                            name: service?.name,
                                            isActive: event?.target?.checked
                                        })}
                                    />
                                }
                                label={service?.name}
                            />
                            {service.isActive && (
                                <FormControl error={errors?.notificationType?.length > 0}>
                                    <FormGroup sx={{ ...styles.formGroup }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={service.notificationType?.sms}
                                                    onChange={(event) => dispatch({
                                                        type: 'handleNotificationTypeChange',
                                                        name: service?.name,
                                                        notificationType: 'sms',
                                                        isActive: event?.target?.checked
                                                    })}
                                                />
                                            }
                                            label="SMS"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={service.notificationType?.email}
                                                    onChange={(event) => dispatch({
                                                        type: 'handleNotificationTypeChange',
                                                        name: service?.name,
                                                        notificationType: 'email',
                                                        isActive: event?.target?.checked
                                                    })}
                                                />
                                            }
                                            label="EMAIL"
                                        />
                                    </FormGroup>
                                    <FormHelperText>{errors?.notificationType || ''}</FormHelperText>
                                </FormControl>
                            )}
                        </FormGroup>
                        <FormHelperText>{errors?.services || ''}</FormHelperText>
                    </FormControl>
                ))
            }
        </>
    )
}

export default ServiceCheckBox

const styles = {
    formGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 1,
        ml: 3
    }
}
import { getNotificationMappingPopulated } from '@/app/_lib/db/notifications/controller'
import React from 'react'
import { notFound } from 'next/navigation'
import { Paper, Stack, Typography } from '@mui/material'
import { CategoryDepartment, GroupsTable, Header, LocationsTable } from '@/app/_lib/components/features/notifications/View'

export const metadata = {
    title: 'View Notification Mapping',
}

const NotificationView = async (props) => {
    const { params } = props
    const id = params.id
    const notificationMap = await getNotificationMappingPopulated(id)

    if (!notificationMap) {
        notFound()
    }

    return (
        <>
            <Header id={id} />
            <Paper elevation={5} >
                <Stack spacing={2} p={2} useFlexGap>
                    <Typography sx={{ ...styles.heading }}>Services:</Typography>
                    {notificationMap?.services?.map((service) => (
                        (service?.notificationType?.sms || service?.notificationType?.email) ?
                            <Typography key={service?.name} sx={{ pl: 3 }}>
                                {service?.name}: {
                                    (service?.notificationType?.sms && service?.notificationType?.email) ? 'sms, email' :
                                        service?.notificationType?.sms ? 'sms' : service?.notificationType?.email ? 'email' : ''
                                }
                            </Typography> : null
                    ))}
                    {
                        notificationMap?.categories?.length > 0 &&
                        <CategoryDepartment entities={notificationMap?.categories || []} heading={'Categories'} />
                    }
                    {
                        notificationMap?.departments?.length > 0 &&
                        <CategoryDepartment entities={notificationMap?.departments || []} heading={'Departments'} />
                    }
                    {
                        notificationMap?.groups?.length > 0 &&
                        <GroupsTable notificationMap={notificationMap} />
                    }
                    {
                        notificationMap?.locations?.length > 0 &&
                        <LocationsTable notificationMap={notificationMap} />
                    }
                </Stack>
            </Paper>
        </>
    )
}

export default NotificationView

const styles = {
    heading: {
        fontWeight: 600,
        fontSize: '18px',
    }
}
import { useEffect, useReducer, useState } from "react"
import { useRouter } from 'next/navigation'
import { defaultNotifications, notificationReducer } from "./notificationReducer"
import { addEditNotificationAction } from '@/app/_lib/db/notifications/actions'

const useNotificationMap = ({ locations = [], updatingNotificationMap = {} }) => {
    const [notifications, dispatch] = useReducer(notificationReducer, defaultNotifications)

    const router = useRouter()

    const selectedLocation = locations?.find(location => location?.id === notifications?.selectedLocation)

    const [pending, setPending] = useState(false)

    const [errors, setErrors] = useState({
        services: '',
        notificationType: '',
        categories: '',
        departments: '',
        groups: '',
        locations: '',
        buildings: ''
    })

    useEffect(() => {
        if (updatingNotificationMap?.id) {
            dispatch({
                type: 'setEditNotification',
                data: updatingNotificationMap
            })
        }
    }, [updatingNotificationMap])

    const handleSubmit = async (event) => {
        event.preventDefault()

        let ignore = false

        if (!ignore) {
            setPending(true)

            if (notifications?.selectedLocation && !notifications?.selectedLocationBuildings?.length) {
                setErrors({
                    services: '',
                    notificationType: '',
                    categories: '',
                    departments: '',
                    groups: '',
                    locations: '',
                    buildings: 'The selected location should have at least one building'
                })
                setPending(false)
                return
            } else if (
                notifications?.locations?.length === 0 &&
                notifications?.selectedLocation &&
                notifications?.selectedLocationBuildings?.length
            ) {
                setErrors({
                    services: '',
                    notificationType: '',
                    categories: '',
                    departments: '',
                    groups: '',
                    locations: '',
                    buildings: 'Add the selected location and buildings to buildings list',
                })
                setPending(false)
                return
            }

            const addedOrUpdatedNotification = await addEditNotificationAction(notifications)

            if (addedOrUpdatedNotification?.errors) {
                setErrors({
                    services: '',
                    notificationType: '',
                    categories: '',
                    departments: '',
                    groups: '',
                    locations: '',
                    ...addedOrUpdatedNotification.errors
                })
                setPending(false)
            }
            if (addedOrUpdatedNotification?.id) {
                setPending(false)
                router.push('/notifications')
            }
        }

        return () => {
            ignore = true;
        };
    }

    return { handleSubmit, notifications, errors, dispatch, selectedLocation, pending }
}

export default useNotificationMap
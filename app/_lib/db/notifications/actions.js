"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { mongoErrorHandler } from "../../utils"
import { noficationMappingValidator } from "../validators"
import { addNotificationMapping, editNotificationMapping } from "./controller"

export async function addEditNotificationAction(data) {
    try {
        const errors = await noficationMappingValidator(data)

        if (Object.values(errors).some(error => error.length > 0)) {
            return { errors }
        }

        const addedOrUpdatedNotificationMap = data?.id ? await editNotificationMapping(data?.id, data) : await addNotificationMapping(data)
        if (addedOrUpdatedNotificationMap?.error || addedOrUpdatedNotificationMap?.errors || addedOrUpdatedNotificationMap?.message) {
            mongoErrorHandler({ errorProneFields: ['services', 'categories', 'departments', 'groups', 'locations'], mongoError: addedOrUpdatedNotificationMap })
        } else {
            revalidatePath("/notifications")
            return addedOrUpdatedNotificationMap
        }
    } catch (error) {
        console.log({ addEditNotificationError: error })
        throw new Error(error)
    }

    redirect("/notifications")
}
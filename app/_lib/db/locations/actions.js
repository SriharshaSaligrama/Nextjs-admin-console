"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addLocation, deleteLocation, editLocation } from "./controller";
import { locationValidator } from "../validators";
import { getFormDataObject, mongoErrorHandler } from "../../utils";

export async function addEditLocationAction(prevState, data) {
    try {
        const { id, name } = getFormDataObject(data)

        const errors = await locationValidator({ name, editId: id })

        if (Object.values(errors).some(error => error.length > 0)) {
            return errors
        }

        const addOrUpdatedLocationError = id ? await editLocation(id, { name }) : await addLocation({ name })

        mongoErrorHandler({ errorProneFields: ['name'], mongoError: addOrUpdatedLocationError })
    }
    catch (error) {
        console.log({ addEditLocationError: error })
        throw new Error(error)
    }

    revalidatePath("/locations")
    redirect("/locations")
}

export async function deleteLocationAction({ id }) {
    try {
        const deleteLocationError = await deleteLocation({ id })

        mongoErrorHandler({ mongoError: deleteLocationError })
    } catch (error) {
        console.log({ deleteLocationError: error })
        throw new Error(error)
    }

    revalidatePath("/locations")
    redirect("/locations")
}
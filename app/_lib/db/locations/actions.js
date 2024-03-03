"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addLocation, deleteLocation, editLocation } from "./controller";
import { locationValidator } from "../validators";
import { getFormDataObject, mongoErrorHandler } from "../../utils";

export async function addLocationAction(prevState, data) {
    try {
        const { name } = getFormDataObject(data)

        const errors = await locationValidator({ name })

        if (Object.values(errors).some(error => error.length > 0)) {
            return errors
        }

        const addedLocationError = await addLocation({ name })

        mongoErrorHandler({ errorProneFields: ['name'], mongoError: addedLocationError })
    } catch (error) {
        console.log({ addLocationError: error })
        throw new Error(error)
    }

    revalidatePath("/locations")
    redirect("/locations")
}

export async function editLocationAction(prevState, data) {
    try {
        const { id, name } = getFormDataObject(data)

        const errors = await locationValidator({ name, editId: id })

        if (Object.values(errors).some(error => error.length > 0)) {
            return errors
        }

        const updatedLocationError = await editLocation(id, { name })

        mongoErrorHandler({ errorProneFields: ['name'], mongoError: updatedLocationError })
    }
    catch (error) {
        console.log({ editLocationError: error })
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
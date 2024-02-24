"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addLocation, deleteLocation, editLocation } from "./controller";
import { locationValidator } from "../utils";

const getFormData = async (data) => {
    const name = data.get('name')
    return { name }
}

export async function addLocationAction(prevState, data) {
    try {
        const { name } = await getFormData(data)

        const errors = await locationValidator({ name })
        if (errors?.name?.length > 0) {
            return errors
        }

        const addedLocationError = await addLocation({ name })

        if (addedLocationError?.errors?.name) {
            throw new Error(addedLocationError?.errors?.name?.message)
        } else if (addedLocationError?.errors?.message) {
            throw new Error(addedLocationError?.errors?.message)
        }
    } catch (error) {
        console.log({ addLocationError: error })
        throw new Error(error)
    }

    revalidatePath("/locations")
    redirect("/locations")
}

export async function editLocationAction(prevState, data) {
    try {
        const id = data.get('id')  //**need to handle id not found error
        const { name } = await getFormData(data)

        const errors = await locationValidator({ name, editId: id })
        if (errors?.name?.length > 0) {
            return errors
        }

        const updatedLocationError = await editLocation(id, { name })

        if (updatedLocationError?.errors?.name) {
            throw new Error(updatedLocationError?.errors?.name?.message)
        } else if (updatedLocationError?.errors?.message) {
            throw new Error(updatedLocationError?.errors?.message)
        }
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

        if (deleteLocationError?.errors) {
            throw new Error(deleteLocationError?.errors?.message)
        }
    } catch (error) {
        console.log({ deleteLocationError: error })
        throw new Error(error)
    }

    revalidatePath("/locations")
    redirect("/locations")
}
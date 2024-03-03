"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBuilding, editBuilding, deleteBuilding } from "./controller";
import { buildingValidator } from "../validators";
import { getLocation } from "../locations/controller";
import { getFormDataObject, mongoErrorHandler } from "../../utils";

export async function addBuildingAction(prevState, data) {
    try {
        const { name, location } = getFormDataObject(data)

        const errors = await buildingValidator({ name, location })

        if (Object.values(errors).some(error => error.length > 0)) {
            return errors
        }

        const locationData = await getLocation(location)
        if (location && !locationData?.id) {
            throw new Error('Selected location not found')
        }

        const addedBuildingError = await addBuilding({ name, location })

        mongoErrorHandler({ errorProneFields: ['name', 'location'], mongoError: addedBuildingError })
    } catch (error) {
        console.log({ addBuildingError: error })
        throw new Error(error)
    }

    revalidatePath("/buildings")
    redirect("/buildings")
}


export async function editBuildingAction(prevState, data) {
    try {
        const { id, name, location } = getFormDataObject(data)

        const errors = await buildingValidator({ name, location, editId: id })

        if (Object.values(errors).some(error => error.length > 0)) {
            return errors
        }

        const locationData = await getLocation(location)
        if (location && !locationData?.id) {
            throw new Error('Selected location not found')
        }

        const updatedBuildingError = await editBuilding(id, { name })

        mongoErrorHandler({ errorProneFields: ['name', 'location'], mongoError: updatedBuildingError })
    }
    catch (error) {
        console.log({ editBuildingError: error })
        throw new Error(error)
    }

    revalidatePath("/buildings")
    redirect("/buildings")
}

export async function deleteBuildingAction({ id, transferringBuildingId }) {
    try {
        const deleteBuildingError = await deleteBuilding({ id, transferringBuildingId })

        mongoErrorHandler({ mongoError: deleteBuildingError })
    } catch (error) {
        console.log({ deleteBuildingError: error })
        throw new Error(error)
    }

    revalidatePath("/buildings")
    redirect("/buildings")
}
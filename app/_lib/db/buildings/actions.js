"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBuilding, editBuilding, deleteBuilding } from "./controller";
import { buildingValidator } from "../validators";
import { getLocation } from "../locations/controller";
import { getFormDataObject, mongoErrorHandler } from "../../utils";

export async function addEditBuildingAction(prevState, data) {
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

        const addedOrUpdatedBuildingError = id ? await editBuilding(id, { name }) : await addBuilding({ name, location })

        mongoErrorHandler({ errorProneFields: ['name', 'location'], mongoError: addedOrUpdatedBuildingError })
    }
    catch (error) {
        console.log({ addEditBuildingError: error })
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
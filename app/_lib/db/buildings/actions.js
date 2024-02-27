"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBuilding, editBuilding, deleteBuilding } from "./controller";
import { buildingValidator } from "../validators";
import { getLocation } from "../locations/controller";
import { mongoErrorHandler } from "../utils";

const getFormData = async (data) => {
    const id = data.get('id')  //**need to handle id not found error
    const name = data.get('name')
    const locationId = data.get('location')
    return { id, name, locationId }
}

export async function addBuildingAction(prevState, data) {
    try {
        const { name, locationId } = await getFormData(data)

        const errors = await buildingValidator({ name, locationId })

        if (Object.values(errors).some(error => error.length > 0)) {
            return errors
        }

        const location = await getLocation(locationId)
        if (!location?.id) {
            throw new Error('Selected location not found')
        }

        const addedBuildingError = await addBuilding({ name, locationId })

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
        const { id, name, locationId } = await getFormData(data)

        const errors = await buildingValidator({ name, locationId, editId: id })

        if (Object.values(errors).some(error => error.length > 0)) {
            return errors
        }

        const location = await getLocation(locationId)
        if (!location?.id) {
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

        if (deleteBuildingError?.message || deleteBuildingError?.error) {
            throw new Error(deleteBuildingError?.message || deleteBuildingError?.error?.message)
        }
    } catch (error) {
        console.log({ deleteBuildingError: error })
        throw new Error(error?.message)
    }

    revalidatePath("/buildings")
    redirect("/buildings")
}
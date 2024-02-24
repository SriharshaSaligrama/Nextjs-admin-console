"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBuilding, editBuilding, deleteBuilding } from "./controller";
import { buildingValidator } from "../utils";
import { getLocation } from "../locations/controller";

const getFormData = async (data) => {
    const name = data.get('name')
    const locationId = data.get('location')
    return { name, locationId }
}

export async function addBuildingAction(prevState, data) {
    try {
        const { name, locationId } = await getFormData(data)

        const errors = await buildingValidator({ name, locationId })
        if (errors?.name?.length > 0 || errors?.location?.length > 0) {
            return errors
        }

        const location = await getLocation(locationId)
        if (!location?.id) {
            throw new Error('Selected location not found')
        }

        const addedBuildingError = await addBuilding({ name, locationId })

        if (addedBuildingError?.errors?.name) {
            throw new Error(addedBuildingError?.errors?.name?.message)
        } else if (addedBuildingError?.errors?.location) {
            throw new Error(addedBuildingError?.errors?.location?.message)
        } else if (addedBuildingError?.errors?.message) {
            throw new Error(addedBuildingError?.errors?.message)
        }
    } catch (error) {
        console.log({ addBuildingError: error })
        throw new Error(error)
    }

    revalidatePath("/buildings")
    redirect("/buildings")
}


export async function editBuildingAction(prevState, data) {
    try {
        const id = data.get('id')  //**need to handle id not found error

        const { name, locationId } = await getFormData(data)

        const errors = await buildingValidator({ name, locationId })
        if (errors?.name?.length > 0 || errors?.location?.length > 0) {
            return errors
        }

        const location = await getLocation(locationId)
        if (!location?.id) {
            throw new Error('Selected location not found')
        }

        const updatedBuildingError = await editBuilding(id, { name })

        if (updatedBuildingError?.errors?.name) {
            throw new Error(updatedBuildingError?.errors?.name?.message)
        } else if (updatedBuildingError?.errors?.location) {
            throw new Error(updatedBuildingError?.errors?.location?.message)
        } else if (updatedBuildingError?.errors?.message) {
            throw new Error(updatedBuildingError?.errors?.message)
        }
    }
    catch (error) {
        console.log({ editBuildingError: error })
        throw new Error(error)
    }

    revalidatePath("/buildings")
    redirect("/buildings")
}

export async function deleteBuildingAction({ id }) {
    try {
        const deleteBuildingError = await deleteBuilding({ id })

        if (deleteBuildingError?.errors) {
            throw new Error(deleteBuildingError?.errors?.message)
        }
    } catch (error) {
        console.log({ deleteBuildingError: error })
        throw new Error(error)
    }

    revalidatePath("/buildings")
    redirect("/buildings")
}
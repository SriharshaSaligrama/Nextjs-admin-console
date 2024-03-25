"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { mongoErrorHandler } from "../../utils"
import { noficationMappingValidator } from "../validators"
import { addNotificationMapping, deleteNotificationMapping, editNotificationMapping } from "./controller"
import { categories } from "../categories/model";
import { departments } from "../departments/model";
import { groups } from "../groups/model";
import { locations } from "../locations/model";
import { buildings } from "../buildings/model";

export async function addEditNotificationAction(data) {
    try {
        const allCategoriesLength = await categories.countDocuments({ isDeleted: false })

        const allDepartmentsLength = await departments.countDocuments({ isDeleted: false })

        const allGroupsLength = await groups.countDocuments({ isDeleted: false })

        const allLocationsLength = await locations.countDocuments({ isDeleted: false })

        const allBuildingsLength = await buildings.countDocuments({ isDeleted: false })

        const selectedCategories = await categories.find({ _id: { $in: data.categories } })

        const selectedDepartments = await departments.find({ _id: { $in: data.departments } })

        const selectedGroups = await groups.find({ _id: { $in: data.groups } })

        const selectedLocations = await locations.find({ _id: { $in: data.locations?.map(location => location?.location) } })

        const selectedBuildings = await buildings.find({ _id: { $in: data.locations?.flatMap(location => location?.buildings) } })

        const errors = await noficationMappingValidator(data)

        if (!allCategoriesLength) {
            errors.categories = "No Categories added. Please add a category to continue."
        }

        if (!data?.categories?.length) {
            errors.categories = "Atleast one category should be selected"

            if (selectedCategories?.length !== data?.categories?.length) {
                errors.categories = 'Selected Categories not found'
            }
        }


        if (!data?.groups?.length) {
            if (!allDepartmentsLength) {
                errors.departments = "No Departments added. Please add a department to continue."
            }

            if (allDepartmentsLength && !data?.departments?.length) {
                errors.departments = "Either a group or department must be selected"
            }

            if (selectedDepartments?.length !== data?.departments?.length) {
                errors.departments = 'Selected Departments not found'
            }
        }

        if (!data?.departments?.length) {
            if (!allGroupsLength) {
                errors.groups = "No Groups added. Please add a group to continue."
            }

            if (allGroupsLength && !data?.groups?.length) {
                errors.groups = "Either a group or department must be selected"
            }

            if (selectedGroups?.length !== data?.groups?.length) {
                errors.groups = 'Selected Groups not found'
            }

            if (!allLocationsLength) {
                errors.locations = "No Locations added. Please add a location to continue."
            }

            if (allLocationsLength && !data?.locations?.length) {
                errors.locations = "Atleast one location should be selected"
            }

            if (selectedLocations?.length !== data?.locations?.length) {
                errors.locations = 'Selected Locations not found'
            }

            if (!allBuildingsLength) {
                errors.buildings = "No Buildings added. Please add a building to continue."
            }

            if (!selectedBuildings?.length) {
                errors.buildings = "Buildings not found, they might have been deleted or doesn't exist"
            }

            if (selectedBuildings?.length !== data?.locations?.flatMap(location => location?.buildings)?.length) {
                errors.buildings = 'Selected Buildings not found'
            }
        }

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

export async function deleteNotificationAction({ id }) {
    try {
        await deleteNotificationMapping({ id })
    } catch (error) {
        console.log({ deleteNotificationError: error })
        throw new Error(error)
    }

    revalidatePath("/notifications")
    redirect("/notifications")
}
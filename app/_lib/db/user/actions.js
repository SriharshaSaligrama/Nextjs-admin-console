"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { addUserValidator, editUserValidator } from "../validators";
import { addUser, deleteUser, editUser, getFilteredUsers } from "./controller";
import { getBuilding } from "../buildings/controller";
import { getDepartment } from "../departments/controller";
import { getFormDataObject, mongoErrorHandler } from "../../utils";
import { signIn } from "@/auth";

const getFormData = async (data) => {
    const formData = getFormDataObject(data)

    return {
        ...formData,
        buildingAssignedTo: ((!formData?.buildingAssignedTo || formData?.buildingAssignedTo.trim() === '') ? null : new mongoose.Types.ObjectId(formData?.buildingAssignedTo)),
        managingBuildings: formData?.managingBuildings?.length > 0 ? formData?.managingBuildings.split(',').map((id) => new mongoose.Types.ObjectId(id)) : [],
        departmentAssignedTo: ((!formData?.departmentAssignedTo || formData?.departmentAssignedTo.trim() === '' || formData?.departmentAssignedTo.trim() === 'selectDepartment') ? null : new mongoose.Types.ObjectId(formData?.departmentAssignedTo))
    }
}

export async function addUserAction(prevState, data) {
    try {
        const {
            fullName,
            email,
            password,
            role,
            buildingAssignedTo,
            managingBuildings,
            departmentAssignedTo
        } = await getFormData(data)

        const errors = await addUserValidator({
            fullName,
            email,
            password,
            role,
            buildingAssignedTo,
            managingBuildings,
        })

        if (Object.values(errors).some(error => error.length > 0)) {
            return errors
        }

        if (buildingAssignedTo) {
            const assignedBuilding = await getBuilding(buildingAssignedTo)
            if (!assignedBuilding?.id) {
                throw new Error('Selected building not found')
            }
        }

        if (managingBuildings?.length > 0) {
            const buildingsManaging = managingBuildings?.map(async (building) => await getBuilding(building))
            const buildingResults = await Promise.all(buildingsManaging || []);
            const verifiedBuildings = buildingResults?.every((building) => building?.id)

            if (!verifiedBuildings) {
                throw new Error('Managing building not found')
            }
        }

        if (departmentAssignedTo) {
            const assignedDepartment = await getDepartment(departmentAssignedTo)
            if (!assignedDepartment?.id) {
                throw new Error('Selected department not found')
            }
        }

        const addedUserError = await addUser({
            fullName,
            email,
            password,
            role,
            buildingAssignedTo,
            managingBuildings,
            departmentAssignedTo
        })

        mongoErrorHandler({ errorProneFields: ['fullName', 'email', 'password', 'role', 'buildingAssignedTo'], mongoError: addedUserError })
    } catch (error) {
        console.log({ addUserError: error })
        throw new Error(error)
    }

    revalidatePath("/users")
    redirect("/users")
}

export async function editUserAction(prevState, data) {
    try {
        const {
            id,
            fullName,
            role,
            buildingAssignedTo,
            managingBuildings,
            departmentAssignedTo
        } = await getFormData(data)

        const errors = await editUserValidator({
            fullName,
            role,
            buildingAssignedTo,
            managingBuildings,
        })

        if (Object.values(errors).some(error => error.length > 0)) {
            return errors
        }

        if (buildingAssignedTo) {
            const assignedBuilding = await getBuilding(buildingAssignedTo)
            if (!assignedBuilding?.id) {
                throw new Error('Selected building not found')
            }
        }

        if (managingBuildings?.length > 0) {
            const buildingsManaging = managingBuildings?.map(async (building) => await getBuilding(building))
            const buildingResults = await Promise.all(buildingsManaging || []);
            const verifiedBuildings = buildingResults?.every((building) => building?.id)

            if (!verifiedBuildings) {
                throw new Error('Managing building not found')
            }
        }

        if (departmentAssignedTo) {
            const assignedDepartment = await getDepartment(departmentAssignedTo)
            if (!assignedDepartment?.id) {
                throw new Error('Selected department not found')
            }
        }

        const updatedUserError = await editUser(id, {
            fullName,
            role,
            buildingAssignedTo,
            managingBuildings,
            departmentAssignedTo
        })

        mongoErrorHandler({ errorProneFields: ['fullName', 'role', 'buildingAssignedTo'], mongoError: updatedUserError })
    } catch (error) {
        console.log({ editUserError: error })
        throw new Error(error)
    }

    revalidatePath("/users")
    redirect("/users")
}

export async function deleteUserAction({ id }) {
    try {
        const deleteUserError = await deleteUser({ id })

        mongoErrorHandler({ mongoError: deleteUserError })
    } catch (error) {
        console.log({ deleteUserError: error })
        throw new Error(error)
    }

    revalidatePath("/users")
    redirect("/users")
}

export const getFilteredUsersAction = async (query) => {
    try {
        const users = await getFilteredUsers(query)
        return users
    } catch (error) {
        console.log({ getFilteredUsersError: error })
        throw new Error(error)
    }
}

export const authenticate = async (prevState, data) => {
    try {
        const { email, password } = Object.fromEntries(data)
        await signIn('credentials', { email, password })
    } catch (error) {
        if (error.type === 'CredentialsSignin') {
            return 'CredentialSignin';
        }
        console.log({ error })
        throw error
    }
}
"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { departmentValidator } from "../validators";
import { addDepartment, deleteDepartment, editDepartment, getDepartment } from "./controller";
import mongoose from "mongoose";
import { getFormDataObject, mongoErrorHandler } from "../utils";
import { updateAssignedDepartmentOfSelectedUsers } from "../user/controller";

const getFormData = async (data) => {
    const formData = getFormDataObject(data)

    return {
        ...formData,
        parent: ((!formData?.parent || formData?.parent.trim() === '') ? null : new mongoose.Types.ObjectId(formData?.parent))
    }
}

export async function addDepartmentAction(prevState, data) {
    try {
        const { name, code, description, parent } = await getFormData(data)

        const errors = await departmentValidator({ name, code })

        if (Object.values(errors).some(error => error.length > 0)) {
            return errors
        }

        const parentDepartment = await getDepartment(parent)
        if (parent && !parentDepartment?.id) {
            throw new Error('Parent department not found')
        }

        const addedDepartmentError = await addDepartment({ name, code, description, parent })

        mongoErrorHandler({ errorProneFields: ['name', 'code'], mongoError: addedDepartmentError })
    } catch (error) {
        console.log({ addDepartmentError: error })
        throw new Error(error)
    }

    revalidatePath("/departments")
    redirect("/departments")
}

export async function editDepartmentAction(prevState, data) {
    try {
        const { id, name, code, description, parent } = await getFormData(data)

        const errors = await departmentValidator({ name, code, editId: id })

        if (Object.values(errors).some(error => error.length > 0)) {
            return errors
        }

        const parentDepartment = await getDepartment(parent)
        if (parent && !parentDepartment?.id) {
            throw new Error('Parent department not found')
        }

        const updatedDepartmentError = await editDepartment(id, { name, code, description, parent })

        mongoErrorHandler({ errorProneFields: ['name', 'code'], mongoError: updatedDepartmentError })
    } catch (error) {
        console.log({ editDepartmentError: error })
        throw new Error(error)
    }

    revalidatePath("/departments")
    redirect("/departments")
}

export async function deleteDepartmentAction({ id, parentId, userExists }) {
    try {
        const parentDepartment = await getDepartment(parentId)
        if (parentId && !parentDepartment?.id) {
            throw new Error('Parent department not found')
        }

        if (userExists) {
            await updateAssignedDepartmentOfSelectedUsers({ deletingDepartmentId: id, transferringDepartmentId: parentId })
        }

        const deleteDepartmentError = await deleteDepartment({ id, parentId })

        if (deleteDepartmentError?.message || deleteDepartmentError?.error) {
            throw new Error(deleteDepartmentError?.message || deleteDepartmentError?.error?.message)
        }
    } catch (error) {
        console.log({ deleteDepartmentError: error })
        throw new Error(error)
    }

    revalidatePath("/departments")
    redirect("/departments")
}

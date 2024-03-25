"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { departmentValidator } from "../validators";
import { addDepartment, deleteDepartment, editDepartment, getDepartment } from "./controller";
import mongoose from "mongoose";
import { getFormDataObject, mongoErrorHandler } from "../../utils";

const getFormData = async (data) => {
    const formData = getFormDataObject(data)

    return {
        ...formData,
        parent: ((!formData?.parent || formData?.parent.trim() === '') ? null : new mongoose.Types.ObjectId(formData?.parent))
    }
}

export async function addEditDepartmentAction(prevState, data) {
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

        const addOrUpdatedDepartmentError = id ? await editDepartment(id, { name, code, description, parent }) : await addDepartment({ name, code, description, parent })

        mongoErrorHandler({ errorProneFields: ['name', 'code'], mongoError: addOrUpdatedDepartmentError })
    } catch (error) {
        console.log({ addEditDepartmentError: error })
        throw new Error(error)
    }

    revalidatePath("/departments")
    redirect("/departments")
}

export async function deleteDepartmentAction({ id, parentId, userExists, notificationExists }) {
    try {
        const parentDepartment = await getDepartment(parentId)
        if (parentId && !parentDepartment?.id) {
            throw new Error('Parent department not found')
        }

        const deleteDepartmentError = await deleteDepartment({ id, parentId, userExists, notificationExists })

        mongoErrorHandler({ mongoError: deleteDepartmentError })
    } catch (error) {
        console.log({ deleteDepartmentError: error })
        throw new Error(error)
    }

    revalidatePath("/departments")
    redirect("/departments")
}

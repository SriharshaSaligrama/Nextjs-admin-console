"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { departmentValidator } from "../validators";
import { addDepartment, deleteDepartment, editDepartment, getDepartment } from "./controller";
import mongoose from "mongoose";

const getFormData = async (data) => {
    const name = data.get('name')
    const code = data.get('code')
    const description = data.get('description')
    const parent = data.get('parent')

    return { name, code, description, parent: (!parent || parent.trim() === '' ? null : new mongoose.Types.ObjectId(parent)) }
}

export async function addDepartmentAction(prevState, data) {
    try {
        const { name, code, description, parent } = await getFormData(data)

        const errors = await departmentValidator({ name, code })
        if (errors?.code?.length > 0 || errors?.name?.length > 0) {
            return errors
        }

        const parentDepartment = await getDepartment(parent)
        if (!parentDepartment?.id) {
            throw new Error('Parent department not found')
        }

        const addedDepartmentError = await addDepartment({ name, code, description, parent })

        if (addedDepartmentError?.errors?.name) {
            throw new Error(addedDepartmentError?.errors?.name?.message)
        } else if (addedDepartmentError?.errors?.code) {
            throw new Error(addedDepartmentError?.errors?.code?.message)
        } else if (addedDepartmentError?.errors?.message) {
            throw new Error(addedDepartmentError?.errors?.message)
        }
    } catch (error) {
        console.log({ addDepartmentError: error })
        throw new Error(error)
    }

    revalidatePath("/departments")
    redirect("/departments")
}

export async function editDepartmentAction(prevState, data) {
    try {
        const id = data.get('id')  //**need to handle id not found error
        const { name, code, description, parent } = await getFormData(data)

        const errors = await departmentValidator({ name, code, editId: id })
        if (errors?.code?.length > 0 || errors?.name?.length > 0) {
            return errors
        }

        const parentDepartment = await getDepartment(parent)
        if (!parentDepartment?.id) {
            throw new Error('Parent department not found')
        }

        const updatedDepartmentError = await editDepartment(id, { name, code, description, parent })

        if (updatedDepartmentError?.errors?.name) {
            throw new Error(updatedDepartmentError?.errors?.name?.message)
        } else if (updatedDepartmentError?.errors?.code) {
            throw new Error(updatedDepartmentError?.errors?.code?.message)
        } else if (updatedDepartmentError?.errors?.message) {
            throw new Error(updatedDepartmentError?.errors?.message)
        }
    }
    catch (error) {
        console.log({ editDepartmentError: error })
        throw new Error(error)
    }

    revalidatePath("/departments")
    redirect("/departments")
}

export async function deleteDepartmentAction({ id, parentId }) {
    try {
        const parentDepartment = await getDepartment(parentId)
        if (!parentDepartment?.id) {
            throw new Error('Parent department not found')
        }

        const deleteDepartmentError = await deleteDepartment({ id, parentId })

        if (deleteDepartmentError?.errors) {
            throw new Error(deleteDepartmentError?.errors?.message)
        }
    } catch (error) {
        console.log({ deleteDepartmentError: error })
        throw new Error(error)
    }

    revalidatePath("/departments")
    redirect("/departments")
}

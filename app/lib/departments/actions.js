"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { departmentValidator } from "../utils";
import { addDepartment, deleteDepartment, editDepartment } from "./controller";
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

        await addDepartment({ name, code, description, parent })
    } catch (error) {
        console.log({ addDepartmentError: error })
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

        await editDepartment(id, { name, code, description, parent })
    }
    catch (error) {
        console.log({ editDepartmentError: error })
    }

    revalidatePath("/departments")
    redirect("/departments")
}

export async function deleteDepartmentAction({ id, parentId }) {
    try {
        await deleteDepartment({ id, parentId })
    } catch (error) {
        console.log({ deleteDepartmentError: error })
    }
    revalidatePath("/departments")
    redirect("/departments")
}

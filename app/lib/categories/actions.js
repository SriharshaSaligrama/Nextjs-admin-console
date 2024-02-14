"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { categoryValidator } from "../utils";
import { addCategory, deleteCategory, editCategory } from "./controller";
import mongoose from "mongoose";

const getFormData = async (data) => {
    const name = data.get('name')
    const code = data.get('code')
    const description = data.get('description')
    const parent = data.get('parent')

    return { name, code, description, parent: (!parent || parent.trim() === '' ? null : new mongoose.Types.ObjectId(parent)) }
}

export async function addCategoryAction(prevState, data) {
    try {
        const { name, code, description, parent } = await getFormData(data)

        const errors = await categoryValidator({ name, code })
        if (errors?.code?.length > 0 || errors?.name?.length > 0) {
            return errors
        }

        await addCategory({ name, code, description, parent })
    } catch (error) {
        console.log({ addCategoryError: error })
    }

    revalidatePath("/categories")
    redirect("/categories")
}

export async function editCategoryAction(prevState, data) {

    try {
        const id = data.get('id')  //**need to handle id not found error
        const { name, code, description, parent } = await getFormData(data)

        const errors = await categoryValidator({ name, code, editId: id })
        if (errors?.code?.length > 0 || errors?.name?.length > 0) {
            return errors
        }

        await editCategory(id, { name, code, description, parent })
    }
    catch (error) {
        console.log({ editCategoryError: error })
    }

    revalidatePath("/categories")
    redirect("/categories")
}

export async function deleteCategoryAction({ id, parentId }) {
    try {
        await deleteCategory({ id, parentId })
    } catch (error) {
        console.log({ deleteCategoryError: error })
    }
    revalidatePath("/categories")
    redirect("/categories")
}

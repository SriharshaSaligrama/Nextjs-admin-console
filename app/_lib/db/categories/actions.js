"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { categoryValidator } from "../validators";
import { addCategory, deleteCategory, editCategory, getCategory } from "./controller";
import mongoose from "mongoose";
import { getFormDataObject, mongoErrorHandler } from "../utils";

const getFormData = async (data) => {
    const formData = getFormDataObject(data)

    return {
        ...formData,
        parent: ((!formData?.parent || formData?.parent.trim() === '') ? null : new mongoose.Types.ObjectId(formData?.parent))
    }
}

export async function addCategoryAction(prevState, data) {
    try {
        const { name, code, description, parent } = await getFormData(data)

        const errors = await categoryValidator({ name, code })

        if (Object.values(errors).some(error => error.length > 0)) {
            return errors
        }

        const parentCategory = await getCategory(parent)
        if (parent && !parentCategory?.id) {
            throw new Error('Parent category not found')
        }

        const addedCategoryError = await addCategory({ name, code, description, parent })

        mongoErrorHandler({ errorProneFields: ['name', 'code'], mongoError: addedCategoryError })
    } catch (error) {
        console.log({ addCategoryError: error })
        throw new Error(error)
    }

    revalidatePath("/categories")
    redirect("/categories")
}

export async function editCategoryAction(prevState, data) {
    try {
        const { id, name, code, description, parent } = await getFormData(data)

        const errors = await categoryValidator({ name, code, editId: id })

        if (Object.values(errors).some(error => error.length > 0)) {
            return errors
        }

        const parentCategory = await getCategory(parent)
        if (parent && !parentCategory?.id) {
            throw new Error('Parent category not found')
        }

        const updatedCategoryError = await editCategory(id, { name, code, description, parent })

        mongoErrorHandler({ errorProneFields: ['name', 'code'], mongoError: updatedCategoryError })
    } catch (error) {
        console.log({ editCategoryError: error })
        throw new Error(error)
    }

    revalidatePath("/categories")
    redirect("/categories")
}

export async function deleteCategoryAction({ id, parentId }) {
    try {
        const parentCategory = await getCategory(parentId)
        if (parentId && !parentCategory?.id) {
            throw new Error('Parent category not found')
        }

        const deleteCategoryError = await deleteCategory({ id, parentId })

        mongoErrorHandler({ mongoError: deleteCategoryError })
    } catch (error) {
        console.log({ deleteCategoryError: error })
        throw new Error(error)
    }

    revalidatePath("/categories")
    redirect("/categories")
}

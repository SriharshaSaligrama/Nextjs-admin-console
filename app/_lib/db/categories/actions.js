"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { categoryValidator } from "../validators";
import { addCategory, deleteCategory, editCategory, getCategory } from "./controller";
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
        if (errors?.code?.length > 0 || errors?.name?.length > 0 || errors?.message) {
            return errors
        }

        const parentCategory = await getCategory(parent)
        if (!parentCategory?.id) {
            throw new Error('Parent category not found')
        }

        const addedCategoryError = await addCategory({ name, code, description, parent })

        if (addedCategoryError?.errors?.name) {
            throw new Error(addedCategoryError?.errors?.name?.message)
        } else if (addedCategoryError?.errors?.code) {
            throw new Error(addedCategoryError?.errors?.code?.message)
        } else if (addedCategoryError?.errors?.message) {
            throw new Error(addedCategoryError?.errors?.message)
        }
    } catch (error) {
        console.log({ addCategoryError: error })
        throw new Error(error)
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

        const parentCategory = await getCategory(parent)
        if (!parentCategory?.id) {
            throw new Error('Parent category not found')
        }

        const updatedCategoryError = await editCategory(id, { name, code, description, parent })

        if (updatedCategoryError?.errors?.name) {
            throw new Error(updatedCategoryError?.errors?.name?.message)
        } else if (updatedCategoryError?.errors?.code) {
            throw new Error(updatedCategoryError?.errors?.code?.message)
        } else if (updatedCategoryError?.errors) {
            throw new Error(updatedCategoryError?.errors?.message)
        }
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
        if (!parentCategory?.id) {
            throw new Error('Parent category not found')
        }

        const deleteCategoryError = await deleteCategory({ id, parentId })

        if (deleteCategoryError?.errors) {
            throw new Error(deleteCategoryError?.errors?.message)
        }
    } catch (error) {
        console.log({ deleteCategoryError: error })
        throw new Error(error)
    }

    revalidatePath("/categories")
    redirect("/categories")
}

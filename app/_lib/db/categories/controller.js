import mongoose from "mongoose";
import { categories } from "./model";
import { connectToDatabase } from "../mongodb";
import { filterChildren } from "../../utils";
import { updateCategoriesOfNotificationMapping } from "../notifications/controller";

export const getCategories = async () => {
    try {
        await connectToDatabase()
        const allExistingCategories = await categories.find({ isDeleted: false }).sort({ createdAt: -1 }).populate('parent');
        return JSON.parse(JSON.stringify(allExistingCategories)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getCategoriesError: error });
        throw new Error(error)
    }
};

export const getAllCategoriesIncludingDeleted = async () => {
    try {
        await connectToDatabase()
        const allCategories = await categories.find();
        return JSON.parse(JSON.stringify(allCategories)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getCategoriesError: error });
        return error
    }
};

export const getCategory = async (id) => {
    try {
        await connectToDatabase()
        const category = await categories.findOne({
            _id: new mongoose.Types.ObjectId(id),
            isDeleted: false
        }).populate('parent');
        return JSON.parse(JSON.stringify(category));
    }
    catch (error) {
        console.log({ getCategorybyIdError: error });
        return null          //returning null for handling not found error
    }
}

export const getParentCategories = async (id) => {
    try {
        const allCategories = await getCategories()
        const category = await getCategory(id)
        if (category?.id) {
            return filterChildren(category, allCategories);
        }
        return []
    }
    catch (error) {
        console.log({ getParentCategoriesError: error });
        throw new Error(error)
    }
}

export const getChildrenCategories = async (id) => {
    try {
        await connectToDatabase()
        const childrenCategories = await categories.find({ parent: id, isDeleted: false })
        return JSON.parse(JSON.stringify(childrenCategories))
    } catch (error) {
        console.log({ getChildrenCategoriesError: error });
        throw new Error(error)
    }
}

export const addCategory = async ({ name, code, description, parent }) => {
    try {
        await connectToDatabase()
        const category = new categories({
            name,
            code,
            description,
            parent
        })
        await category.save()
    }
    catch (error) {
        console.log({ addCategoryError: error });
        return error
    }
}

export const editCategory = async (id, { name, code, description, parent }) => {
    try {
        await connectToDatabase()
        await categories.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { $set: { name, code, description, parent } },
            { new: true, runValidators: true }
        );
    }
    catch (error) {
        console.log({ editCategoryError: error });
        return error
    }
}

export const deleteCategory = async ({ id, parentId, notificationExists }) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if (notificationExists) {
            const updateCategoriesOfNotificationMappingError = await updateCategoriesOfNotificationMapping({ deletingCategoryId: id, transferringCategoryId: parentId })
            if (updateCategoriesOfNotificationMappingError) {
                throw new Error(updateCategoriesOfNotificationMappingError?.error?.message || updateCategoriesOfNotificationMappingError?.message || updateCategoriesOfNotificationMappingError?.error)
            }
        }

        const childrenCategories = await getChildrenCategories(id)
        if (childrenCategories?.error) {
            throw new Error(childrenCategories?.error?.message || childrenCategories?.message || childrenCategories?.error)
        }
        if (childrenCategories?.length > 0) {
            const updatedCategories = await categories.updateMany(
                { _id: { $in: childrenCategories.map(category => category.id) } },
                { $set: { parent: parentId } }
            )

            if (updatedCategories.acknowledged && updatedCategories.modifiedCount > 0) {
                await categories.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
            } else throw new Error('Categories not updated')
        }
        else if (childrenCategories?.length === 0) {
            await categories.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
        }
        await session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        console.log({ deleteCategoryError: error });
        await session.abortTransaction();
        session.endSession();
        return error
    }
}
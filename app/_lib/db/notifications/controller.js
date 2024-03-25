import mongoose from "mongoose";
import { categories } from "../categories/model";
import { departments } from "../departments/model";
import { groups } from "../groups/model";
import { locations } from "../locations/model";
import { buildings } from "../buildings/model";
import { notifications } from "./model";
import { connectToDatabase } from "../mongodb";

export const getNotificationsMapping = async () => {
    try {
        await connectToDatabase()
        const allExistingNotificationsMapping = await notifications
            .find({ isDeleted: false })
            .sort({ createdAt: -1 })
            .populate('categories departments groups locations.location locations.buildings')
        return JSON.parse(JSON.stringify(allExistingNotificationsMapping)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getNotificationsMappingError: error });
        console.log({ locations, buildings, departments, categories, groups })
        throw new Error(error)
    }
};

export const getNotificationMappingPopulated = async (id) => {
    try {
        await connectToDatabase()
        const notification = await notifications.findOne({
            _id: new mongoose.Types.ObjectId(id),
            isDeleted: false
        }).populate('categories departments groups locations.location locations.buildings');
        return JSON.parse(JSON.stringify(notification));
    }
    catch (error) {
        console.log({ getNotificationMappingbyIdError: error });
        return null          //returning null for handling not found error
    }
}

export const getNotificationMappingByCategoryId = async (categoryId) => {  //used while deleting a category
    try {
        await connectToDatabase()
        const notificationsByCategory = await notifications.find({
            categories: { $in: [categoryId] },
            isDeleted: false
        }).populate('categories departments groups locations.location locations.buildings');
        return JSON.parse(JSON.stringify(notificationsByCategory));
    }
    catch (error) {
        console.log({ getNotificationMappingbyCategoryIdError: error });
        throw new Error(error)
    }
}

export const getNotificationMappingByDepartmentId = async (departmentId) => {  //used while deleting a department
    try {
        await connectToDatabase()
        const notificationsByDepartment = await notifications.find({
            departments: { $in: [departmentId] },
            isDeleted: false
        }).populate('categories departments groups locations.location locations.buildings');
        return JSON.parse(JSON.stringify(notificationsByDepartment));
    }
    catch (error) {
        console.log({ getNotificationMappingbyDepartmentIdError: error });
        throw new Error(error)
    }
}

export const getNotificationMappingByGroupId = async (groupId) => {  //used while deleting a group
    try {
        await connectToDatabase()
        const notificationsByGroup = await notifications.find({
            groups: { $in: [groupId] },
            isDeleted: false
        }).populate('categories departments groups locations.location locations.buildings');
        return JSON.parse(JSON.stringify(notificationsByGroup));
    }
    catch (error) {
        console.log({ getNotificationMappingbyGroupIdError: error });
        throw new Error(error)
    }
}

export const getNotificationMapping = async (id) => {
    try {
        await connectToDatabase()
        const notification = await notifications.findOne({
            _id: new mongoose.Types.ObjectId(id),
            isDeleted: false
        });
        return JSON.parse(JSON.stringify(notification));
    }
    catch (error) {
        console.log({ getNotificationMappingbyIdError: error });
        return null          //returning null for handling not found error
    }
}

export const addNotificationMapping = async (data) => {
    try {
        await connectToDatabase()
        const notificationMap = await notifications.create(data);
        return JSON.parse(JSON.stringify(notificationMap))
    }
    catch (error) {
        console.log({ addNotificationMappingError: error });
        return error
    }
}

export const editNotificationMapping = async (id, data) => {
    try {
        await connectToDatabase()
        const updatedNotificationMap = await notifications.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { $set: data },
            { new: true, runValidators: true }
        );
        return JSON.parse(JSON.stringify(updatedNotificationMap))
    }
    catch (error) {
        console.log({ editNotificationMappingError: error });
        return error
    }
}

export const deleteNotificationMapping = async ({ id }) => {
    try {
        await connectToDatabase()
        await notifications.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
    }
    catch (error) {
        console.log({ deleteNotificationMappingError: error });
        return error
    }
}

export const updateCategoriesOfNotificationMapping = async ({ deletingCategoryId, transferringCategoryId }) => {    //used while deleting a category
    try {
        await connectToDatabase()
        const updatedCategories = await notifications.updateMany(
            { categories: { $in: [deletingCategoryId] }, isDeleted: false },
            { $addToSet: { categories: transferringCategoryId } },
        )
        if (updatedCategories.acknowledged && updatedCategories.modifiedCount > 0) {
            await notifications.updateMany(
                { categories: { $in: [deletingCategoryId] }, isDeleted: false },
                { $pull: { categories: deletingCategoryId } },
            )
        } else throw new Error('Categories not updated')
    } catch (error) {
        console.log({ updateCategoriesOfNotificationMappingError: error });
        return error
    }
}

export const updateDepartmentsOfNotificationMapping = async ({ deletingDepartmentId, transferringDepartmentId }) => {   //used while deleting a department
    try {
        await connectToDatabase()
        const updatedDepartments = await notifications.updateMany(
            { departments: { $in: [deletingDepartmentId] }, isDeleted: false },
            { $addToSet: { departments: transferringDepartmentId } },
        )
        if (updatedDepartments.acknowledged && updatedDepartments.modifiedCount > 0) {
            await notifications.updateMany(
                { departments: { $in: [deletingDepartmentId] }, isDeleted: false },
                { $pull: { departments: deletingDepartmentId } },
            )
        } else throw new Error('Departments not updated')
    } catch (error) {
        console.log({ updateDepartmentsOfNotificationMappingError: error });
        return error
    }
}


export const updateGroupsOfNotificationMapping = async ({ deletingGroupId, transferringGroupId }) => {   //used while deleting a group
    try {
        await connectToDatabase()
        const updatedGroups = await notifications.updateMany(
            { groups: { $in: [deletingGroupId] }, isDeleted: false },
            { $addToSet: { groups: transferringGroupId } },
        )
        if (updatedGroups.acknowledged && updatedGroups.modifiedCount > 0) {
            await notifications.updateMany(
                { groups: { $in: [deletingGroupId] }, isDeleted: false },
                { $pull: { groups: deletingGroupId } },
            )
        } else throw new Error('Groups not updated')
    } catch (error) {
        console.log({ updateGroupsOfNotificationMappingError: error });
        return error
    }
}

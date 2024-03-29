import mongoose from "mongoose";
import { departments } from "./model";
import { connectToDatabase } from "../mongodb";
import { updateAssignedDepartmentOfSelectedUsers } from "../user/controller";
import { filterChildren } from "../../utils";
import { updateDepartmentsOfNotificationMapping } from "../notifications/controller";

export const getDepartments = async () => {
    try {
        await connectToDatabase()
        const allExistingDepartments = await departments.find({ isDeleted: false }).sort({ createdAt: -1 }).populate('parent');
        return JSON.parse(JSON.stringify(allExistingDepartments)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getDepartmentsError: error });
        throw new Error(error)
    }
};

export const getAllDepartmentsIncludingDeleted = async () => {
    try {
        await connectToDatabase()
        const allDepartments = await departments.find();
        return JSON.parse(JSON.stringify(allDepartments)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getDepartmentsError: error });
        return error
    }
};

export const getDepartment = async (id) => {
    try {
        await connectToDatabase()
        const department = await departments.findOne({
            _id: new mongoose.Types.ObjectId(id),
            isDeleted: false
        }).populate('parent');
        return JSON.parse(JSON.stringify(department));
    }
    catch (error) {
        console.log({ getDepartmentbyIdError: error });
        return null          //returning null for handling not found error
    }
}

export const getParentDepartments = async (id) => {
    try {
        const allDepartments = await getDepartments()
        const department = await getDepartment(id)
        if (department?.id) {
            return filterChildren(department, allDepartments);
        }
        return []
    }
    catch (error) {
        console.log({ getParentDepartmentsError: error });
        throw new Error(error)
    }
}

export const getChildrenDepartments = async (id) => {
    try {
        await connectToDatabase()
        const childrenDepartments = await departments.find({ parent: id, isDeleted: false })
        return JSON.parse(JSON.stringify(childrenDepartments))
    } catch (error) {
        console.log({ getChildrenDepartmentsError: error });
        throw new Error(error)
    }
}

export const addDepartment = async ({ name, code, description, parent }) => {
    try {
        await connectToDatabase()
        const department = new departments({
            name,
            code,
            description,
            parent
        })
        await department.save()
    }
    catch (error) {
        console.log({ addDepartmentError: error });
        return error
    }
}

export const editDepartment = async (id, { name, code, description, parent }) => {
    try {
        await connectToDatabase()
        await departments.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { $set: { name, code, description, parent } },
            { new: true, runValidators: true }
        );
    }
    catch (error) {
        console.log({ editDepartmentError: error });
        return error
    }
}

export const deleteDepartment = async ({ id, parentId, userExists, notificationExists }) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if (userExists) {
            const updateAssignedDepartmentOfSelectedUsersError = await updateAssignedDepartmentOfSelectedUsers({ deletingDepartmentId: id, transferringDepartmentId: parentId })
            if (updateAssignedDepartmentOfSelectedUsersError) {
                throw new Error(updateAssignedDepartmentOfSelectedUsersError?.error?.message || updateAssignedDepartmentOfSelectedUsersError?.message || updateAssignedDepartmentOfSelectedUsersError?.error)
            }
        }

        if (notificationExists) {
            const updateDepartmentsOfNotificationMappingError = await updateDepartmentsOfNotificationMapping({ deletingDepartmentId: id, transferringDepartmentId: parentId })
            if (updateDepartmentsOfNotificationMappingError) {
                throw new Error(updateDepartmentsOfNotificationMappingError?.error?.message || updateDepartmentsOfNotificationMappingError?.message || updateDepartmentsOfNotificationMappingError?.error)
            }
        }

        const childrenDepartments = await getChildrenDepartments(id)
        if (childrenDepartments?.error) {
            throw new Error(childrenDepartments?.error?.message || childrenDepartments?.message || childrenDepartments?.error)
        }

        if (childrenDepartments.length > 0) {
            const updatedDepartments = await departments.updateMany(
                { _id: { $in: childrenDepartments.map(department => department.id) } },
                { $set: { parent: parentId } }
            )

            if (updatedDepartments.acknowledged && updatedDepartments.modifiedCount > 0) {
                await departments.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
            } else throw new Error('Departments not updated')
        }
        else if (childrenDepartments.length === 0) {
            await departments.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
        }
        await session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        console.log({ deleteDepartmentError: error });
        await session.abortTransaction();
        session.endSession();
        return error
    }
}
import mongoose from "mongoose";
import { departments } from "./model";
import { connectToDatabase } from "../mongodb";
import { updateAssignedDepartmentOfSelectedUsers } from "../user/controller";

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
            const childrenDepartments = []

            const filterChildrenDepartments = (department) => {
                childrenDepartments.push(String(department.id), department.name)
                const children = allDepartments.filter(dept => dept.parent?.id?.toString() === department.id?.toString())
                for (let child of children) {
                    filterChildrenDepartments(child)
                }
            }

            filterChildrenDepartments(department)
            const parentDepartments = allDepartments.filter(department => !childrenDepartments.includes(String(department.id)))
            return JSON.parse(JSON.stringify(parentDepartments))
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

export const deleteDepartment = async ({ id, parentId, userExists }) => {
    try {
        if (userExists) {
            const updateAssignedDepartmentOfSelectedUsersError = await updateAssignedDepartmentOfSelectedUsers({ deletingDepartmentId: id, transferringDepartmentId: parentId })
            if (updateAssignedDepartmentOfSelectedUsersError) {
                return updateAssignedDepartmentOfSelectedUsersError
            }
        }

        const childrenDepartments = await getChildrenDepartments(id)

        if (childrenDepartments.length > 0) {
            const updatedDepartments = await departments.updateMany(
                { _id: { $in: childrenDepartments.map(department => department.id) } },
                { $set: { parent: parentId } }
            )

            if (updatedDepartments.acknowledged && updatedDepartments.modifiedCount > 0) {
                await departments.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
            }
        }
        else if (childrenDepartments.length === 0) {
            await departments.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
        }
    }
    catch (error) {
        console.log({ deleteDepartmentError: error });
        return error
    }
}
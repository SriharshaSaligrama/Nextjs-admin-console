import mongoose from "mongoose";
import { locations } from "../locations/model"; //importing locations model to avoid error of accessing buildings model without registering locations model, error occurs if you directly try to access buildings page before accessing locations page in ui.
import { buildings } from "../buildings/model"; //importing buildings model to avoid error of accessing users model without registering buildings model, error occurs if you directly try to access users page before accessing buildings page in ui.
import { departments } from "../departments/model"; //importing departments model to avoid error of accessing users model without registering departments model, error occurs if you directly try to access users page before accessing departments page in ui.
import { users } from "./model";
import { connectToDatabase } from "../mongodb";
import bcrypt from 'bcrypt';
import { updateAllGroupsOfAUserByEmail } from "../groups/controller";

export const getUsers = async () => {
    try {
        await connectToDatabase()
        const allExistingUsers = await users.find({ isDeleted: false }).sort({ createdAt: -1 }).populate('buildingAssignedTo departmentAssignedTo managingBuildings');
        return JSON.parse(JSON.stringify(allExistingUsers)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getUsersError: error });
        console.log({ locations, buildings, departments })
        throw new Error(error)
    }
};

export const getFilteredUsers = async (query) => { // used by groups for searching users
    try {
        await connectToDatabase()
        const filteredUsers = await users.find({
            $and: [
                { isDeleted: false }, // Only fetch users where isDeleted is false
                {
                    $or: [
                        { fullName: { $regex: query, $options: 'i' } }, // Case-insensitive search for name
                        { email: { $regex: query, $options: 'i' } } // Case-insensitive search for email
                    ]
                }
            ]
        })
        return JSON.parse(JSON.stringify(filteredUsers))
    }
    catch (error) {
        console.log({ getFilteredUsersError: error });
        return error
    }
}

export const getUserByEmailId = async (email) => {
    try {
        await connectToDatabase()
        const user = await users.findOne({ email, isDeleted: false });
        return JSON.parse(JSON.stringify(user))
    }
    catch (error) {
        console.log({ getUserByEmailIdError: error });
        throw new Error(error)
    }
}

export const getUsersByBuildingId = async (buildingId) => {
    try {
        await connectToDatabase()
        const allUsersOfSelectedBuilding = await users.find({ buildingAssignedTo: buildingId, isDeleted: false }).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(allUsersOfSelectedBuilding))
    }
    catch (error) {
        console.log({ getUsersByBuildingIdError: error });
        throw new Error(error)
    }
}

export const getUsersByDepartmentId = async (departmentId) => {
    try {
        await connectToDatabase()
        const allUsersOfSelectedDepartment = await users.find({ departmentAssignedTo: departmentId, isDeleted: false }).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(allUsersOfSelectedDepartment))
    }
    catch (error) {
        console.log({ getUsersByDepartmentIdError: error });
        throw new Error(error)
    }
}

export const getAllUsersIncludingDeleted = async () => {
    try {
        await connectToDatabase()
        const allUsers = await users.find();
        return JSON.parse(JSON.stringify(allUsers)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getUsersError: error });
        return error
    }
};

export const getUser = async (id) => {
    try {
        await connectToDatabase()
        const user = await users.findOne({
            _id: new mongoose.Types.ObjectId(id),
            isDeleted: false
        }).populate('buildingAssignedTo departmentAssignedTo managingBuildings');

        user.managingBuildings = user.managingBuildings.map(building => building.id);

        return JSON.parse(JSON.stringify(user));
    }
    catch (error) {
        console.log({ getUserbyIdError: error });
        return null          //returning null for handling not found error
    }
}

export const getUserType = async (email) => {   //internal or external user, used in groups
    try {
        await connectToDatabase()
        const user = await users.findOne({
            email,
            isDeleted: false
        })

        return user?.email ? 'internal' : 'external'
    } catch (error) {
        console.log({ getUserTypeError: error })
        return error
    }
}

export const addUser = async ({ fullName, email, password, role, buildingAssignedTo, managingBuildings, departmentAssignedTo }) => {
    try {
        await connectToDatabase()
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new users({ fullName, email, password: hashedPassword, role, buildingAssignedTo, managingBuildings, departmentAssignedTo })
        await user.save()
    }
    catch (error) {
        console.log({ addUserError: error });
        return error
    }
}

export const editUser = async (id, { fullName, role, buildingAssignedTo, managingBuildings, departmentAssignedTo }) => {
    try {
        await connectToDatabase()
        await users.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { $set: { fullName, role, buildingAssignedTo, managingBuildings, departmentAssignedTo } },
            { new: true, runValidators: true }
        );
    }
    catch (error) {
        console.log({ editUserError: error });
        return error
    }
}

export const deleteUser = async ({ id }) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user = await getUser(id)
        if (user?.id) {
            const updateGroupError = await updateAllGroupsOfAUserByEmail(user?.email)
            if (updateGroupError) throw new Error(updateGroupError?.error?.message || updateGroupError?.message || updateGroupError?.error)
            await users.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
            await session.commitTransaction();
            session.endSession();
        } else throw new Error('User not found')
    }
    catch (error) {
        console.log({ deleteUserError: error });
        await session.abortTransaction();
        session.endSession();
        return error
    }
}

export const updateAllManagingBuildingsOfFMs = async (buildingId) => { //runs only while deleting a building, if it is managed by FM or admin
    try {
        await connectToDatabase()
        await users.updateMany(
            { managingBuildings: { $in: [buildingId] }, isDeleted: false },
            { $pull: { managingBuildings: buildingId } },
            { new: true, runValidators: true }
        );
    }
    catch (error) {
        console.log({ getAllManagingBuildingsError: error });
        return error
    }
}

export const updateAssignedBuildingOfSelectedUsers = async ({ deletingBuildingId, transferringBuildingId }) => { //runs only while deleting a building, if there are users assigned to it
    try {
        await connectToDatabase()
        await users.updateMany(
            { buildingAssignedTo: new mongoose.Types.ObjectId(deletingBuildingId), isDeleted: false },
            { $set: { buildingAssignedTo: new mongoose.Types.ObjectId(transferringBuildingId) } },
            { new: true, runValidators: true }
        );
    }
    catch (error) {
        console.log({ updateAssignedBuildingOfSelectedUsersError: error });
        return error
    }
}

export const updateAssignedDepartmentOfSelectedUsers = async ({ deletingDepartmentId, transferringDepartmentId }) => { //runs only while deleting a department, if there are users assigned to it
    try {
        await connectToDatabase()
        await users.updateMany(
            { departmentAssignedTo: new mongoose.Types.ObjectId(deletingDepartmentId), isDeleted: false },
            { $set: { departmentAssignedTo: new mongoose.Types.ObjectId(transferringDepartmentId) } },
            { new: true, runValidators: true }
        );
    }
    catch (error) {
        console.log({ updateAssignedDepartmentOfSelectedUsersError: error });
        return error
    }
}
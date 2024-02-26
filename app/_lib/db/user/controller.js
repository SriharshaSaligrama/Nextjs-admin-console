import mongoose from "mongoose";
import { locations } from "../locations/model"; //importing locations model to avoid error of accessing buildings model without registering locations model, error occurs if you directly try to access buildings page before accessing locations page in ui.
import { buildings } from "../buildings/model"; //importing buildings model to avoid error of accessing users model without registering buildings model, error occurs if you directly try to access users page before accessing buildings page in ui.
import { users } from "./model";
import { connectToDatabase } from "../mongodb";
import bcrypt from 'bcrypt';

export const getUsers = async () => {
    try {
        await connectToDatabase()
        const allExistingUsers = await users.find({ isDeleted: false }).sort({ createdAt: -1 }).populate('buildingAssignedTo departmentAssignedTo managingBuildings');
        return JSON.parse(JSON.stringify(allExistingUsers)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getUsersError: error });
        console.log({ locations, buildings })
        throw new Error(error)
    }
};

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
    try {
        await users.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
    }
    catch (error) {
        console.log({ deleteUserError: error });
        return error
    }
}
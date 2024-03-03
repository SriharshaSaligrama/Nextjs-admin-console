import mongoose from "mongoose";
import { groups } from "./model";
import { connectToDatabase } from "../mongodb";

export const getGroups = async () => {
    try {
        await connectToDatabase()
        const allExistingGroups = await groups.find({ isDeleted: false }).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(allExistingGroups)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getGroupsError: error });
        throw new Error(error)
    }
};

export const getAllGroupsIncludingDeleted = async () => {
    try {
        await connectToDatabase()
        const allGroups = await groups.find();
        return JSON.parse(JSON.stringify(allGroups)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getGroupsError: error });
        return error
    }
};

export const getGroup = async (id) => {
    try {
        await connectToDatabase()
        const group = await groups.findOne({
            _id: new mongoose.Types.ObjectId(id),
            isDeleted: false
        });
        return JSON.parse(JSON.stringify(group));
    }
    catch (error) {
        console.log({ getGroupbyIdError: error });
        return null          //returning null for handling not found error
    }
}

export const addGroup = async ({ name, code, description, members }) => {
    try {
        await connectToDatabase()
        const group = new groups({
            name,
            code,
            description,
            members
        })
        await group.save()
    }
    catch (error) {
        console.log({ addGroupError: error });
        return error
    }
}

export const addGroupModal = async ({ name, code, description, members }) => {
    try {
        await connectToDatabase()
        const group = new groups({
            name,
            code,
            description,
            members
        })
        const addedGroup = await group.save()
        return JSON.parse(JSON.stringify(addedGroup))
    }
    catch (error) {
        console.log({ addGroupError: error });
        return error
    }
}

export const editGroup = async (id, { name, code, description, members }) => {
    try {
        await connectToDatabase()
        await groups.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { $set: { name, code, description, members } },
            { new: true, runValidators: true }
        );
    }
    catch (error) {
        console.log({ editGroupError: error });
        return error
    }
}

export const editGroupModal = async (id, { name, code, description, members }) => {
    try {
        await connectToDatabase()
        const updatedGroup = await groups.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { $set: { name, code, description, members } },
            { new: true, runValidators: true }
        );
        return JSON.parse(JSON.stringify(updatedGroup))
    }
    catch (error) {
        console.log({ editGroupError: error });
        return error
    }
}

export const deleteGroup = async ({ id }) => {
    try {
        await connectToDatabase()
        await groups.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
    }
    catch (error) {
        console.log({ deleteGroupError: error });
        return error
    }
}

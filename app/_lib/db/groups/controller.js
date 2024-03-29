import mongoose from "mongoose";
import { groups } from "./model";
import { users } from "../user/model";
import { connectToDatabase } from "../mongodb";
import { getSkipCount } from "../../utils";
import { updateGroupsOfNotificationMapping } from "../notifications/controller";

const itemsPerPage = 6;

export const getPaginatedGroups = async (currentPage = 1) => {
    const skipCount = getSkipCount({ currentPage, itemsPerPage })

    try {
        await connectToDatabase()

        const [result] = await groups.aggregate([
            { $match: { isDeleted: false } },
            {
                $facet: {
                    "groupsByPage": [
                        { $sort: { createdAt: -1 } },
                        { $skip: skipCount },
                        { $limit: itemsPerPage },
                        { $addFields: { "id": "$_id" } }, // Add a new field 'id' with the value of '_id'
                        { $unset: "_id" } // Remove the '_id' field
                    ],
                    "totalGroupsCount": [{ $count: "count" }]
                }
            },
            {
                $project: {
                    "groupsByPage": 1,
                    "totalNumberOfPages": {
                        $ceil: {
                            $divide: [
                                { $arrayElemAt: ["$totalGroupsCount.count", 0] },
                                itemsPerPage
                            ]
                        }
                    }
                }
            }
        ])

        return JSON.parse(JSON.stringify(result)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getPaginatedGroupsError: error });
        console.log({ users })
        throw new Error(error)
    }
};

export const getQueryFilteredPaginatedGroups = async (query, currentPage = 1) => {
    try {
        const skipCount = getSkipCount({ currentPage, itemsPerPage })

        const [result] = await groups.aggregate([
            {
                $match: {
                    $and: [
                        { isDeleted: false },
                        {
                            $or: [
                                { "name": { $regex: query, $options: "i" } },
                                { "code": { $regex: query, $options: "i" } },
                                { "members.email": { $regex: query, $options: "i" } }
                            ]
                        }
                    ]
                }
            },
            {
                $facet: {
                    "filteredGroupsByPage": [
                        { $sort: { createdAt: -1 } },
                        { $skip: skipCount },
                        { $limit: itemsPerPage },
                        { $addFields: { "id": "$_id" } }, // Add a new field 'id' with the value of '_id'
                        { $unset: "_id" } // Remove the '_id' field
                    ],
                    "filteredGroupsCount": [{ $count: "count" }]
                }
            },
            {
                $project: {
                    "filteredGroupsByPage": 1,
                    "totalNumberOfPages": {
                        $ceil: {
                            $divide: [
                                { $arrayElemAt: ["$filteredGroupsCount.count", 0] },
                                itemsPerPage
                            ]
                        }
                    }
                }
            }
        ]);

        return JSON.parse(JSON.stringify(result))
    } catch (error) {
        console.log({ getQueryFilteredGroupsError: error });
        throw new Error(error)
    }
}

export const getRestOfTheGroups = async (groupId) => {
    try {
        await connectToDatabase()
        const restOfTheGroups = await groups.find({ _id: { $nin: [groupId] }, isDeleted: false });
        return JSON.parse(JSON.stringify(restOfTheGroups)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getRestOfTheGroupsError: error });
        throw new Error(error)
    }
};

export const getGroups = async () => {
    try {
        await connectToDatabase()
        const allGroups = await groups.find({ isDeleted: false });
        return JSON.parse(JSON.stringify(allGroups)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getGroupsError: error });
        return error
    }
};

export const getAllGroupsIncludingDeleted = async () => {
    try {
        await connectToDatabase()
        const allGroups = await groups.find();
        return JSON.parse(JSON.stringify(allGroups)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getAllGroupsIncludingDeletedError: error });
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
        console.log({ addGroupModalError: error });
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
        console.log({ editGroupModalError: error });
        return error
    }
}

export const deleteGroup = async ({ id, transferringGroupId }) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if (transferringGroupId) {
            const updateNotificationError = await updateGroupsOfNotificationMapping({ deletingGroupId: id, transferringGroupId })
            if (updateNotificationError) {
                throw new Error(updateNotificationError?.error?.message || updateNotificationError?.message || updateNotificationError?.error)
            }
        }
        await groups.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
        await session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        console.log({ deleteGroupError: error });
        await session.abortTransaction();
        session.endSession();
        return error
    }
}

export const getAllExternalEmails = async () => {
    try {
        await connectToDatabase()
        const externalEmails = await groups.aggregate([
            { $unwind: "$members" },
            {
                $match: {
                    "members.type": "external",
                    isDeleted: false,
                }
            },
            {
                $group: {
                    _id: "$members.email",
                    groups: {
                        $push: {
                            id: "$_id",
                            name: "$name"
                        }
                    }
                },
            },
            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    groups: 1,
                },
            }
        ]);
        return JSON.parse(JSON.stringify(externalEmails))
    }
    catch (error) {
        console.log({ getAllExternalEmailsError: error });
        return error
    }
}

export const updateAllGroupsOfAUserByEmail = async (email) => {  //called while deleting a user, if user is a member of any group/s, the user will be removed from those groups
    try {
        await connectToDatabase()
        await groups.updateMany(
            { "members.email": email, isDeleted: false },
            { $pull: { members: { email: email } } },
            { new: true, runValidators: true }
        )
    }
    catch (error) {
        console.log({ getAllGroupsOfAUserByEmailError: error });
        return error
    }
}
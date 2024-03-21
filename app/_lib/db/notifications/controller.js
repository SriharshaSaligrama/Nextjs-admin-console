import mongoose from "mongoose";
import { categories } from "../categories/model";
import { departments } from "../departments/model";
import { groups } from "../groups/model";
import { locations } from "../locations/model";
import { buildings } from "../buildings/model";
import { notifications } from "./model";
import { connectToDatabase } from "../mongodb";
import { getSkipCount } from "../../utils";
import { populatedQuery } from "./data";

const itemsPerPage = 3;

export const getPaginatedNotificationsMapping = async (currentPage = 1) => {
    const skipCount = getSkipCount({ currentPage, itemsPerPage })

    try {
        await connectToDatabase()
        const paginatedNotificationsMapping = await notifications.aggregate([
            ...populatedQuery,
            {
                $facet: {
                    totalRowCount: [{ $count: "total" }],
                    data: [
                        { $skip: skipCount }, // Skip documents for pagination
                        { $limit: itemsPerPage }, // Limit documents for pagination
                    ],
                },
            },
            {
                $project: {
                    data: 1,
                    totalDocuments: {
                        $arrayElemAt: ["$totalRowCount.total", 0],
                    },
                    totalNumberOfPages: {
                        $ceil: {
                            $divide: [
                                {
                                    $arrayElemAt: [
                                        "$totalRowCount.total",
                                        0,
                                    ],
                                },
                                itemsPerPage,
                            ],
                        },
                    },
                },
            },
        ])
        return JSON.parse(JSON.stringify(paginatedNotificationsMapping)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getPaginatedNotificationsMappingError: error });
        throw new Error(error)
    }
}

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
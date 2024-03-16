import mongoose from "mongoose";
import { locations } from "../locations/model"; //importing locations model to avoid error of accessing buildings model without registering locations model, error occurs if you directly try to access buildings page before accessing locations page in ui.
import { buildings } from "./model";
import { connectToDatabase } from "../mongodb";
import { updateAllManagingBuildingsOfFMs, updateAssignedBuildingOfSelectedUsers } from "../user/controller";

export const getBuildings = async () => {
    try {
        await connectToDatabase()
        const allExistingBuildings = await buildings.find({ isDeleted: false }).sort({ createdAt: -1 }).populate('location');
        return JSON.parse(JSON.stringify(allExistingBuildings)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getBuildingsError: error });
        console.log({ locations })
        throw new Error(error)
    }
};

export const getBuildingsByLocationId = async (locationId) => {
    try {
        await connectToDatabase()
        const allBuildingsOfSelectedLocation = await buildings.find({ location: locationId || null, isDeleted: false });
        return JSON.parse(JSON.stringify(allBuildingsOfSelectedLocation))
    } catch (error) {
        console.log({ getBuildingsByLocationIdError: error });
        throw new Error(error)
    }
}

export const getAllBuildingsIncludingDeleted = async () => {
    try {
        await connectToDatabase()
        const allBuildings = await buildings.find();
        return JSON.parse(JSON.stringify(allBuildings)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getBuildingsError: error });
        return error
    }
};

export const getBuilding = async (id) => {
    try {
        await connectToDatabase()
        const building = await buildings.findOne({
            _id: new mongoose.Types.ObjectId(id),
            isDeleted: false
        }).populate('location');
        return JSON.parse(JSON.stringify(building));
    }
    catch (error) {
        console.log({ getBuildingbyIdError: error });
        return null          //returning null for handling not found error
    }
}

export const addBuilding = async ({ name, location }) => {
    try {
        await connectToDatabase()
        const building = new buildings({ name, location })
        await building.save()
    }
    catch (error) {
        console.log({ addBuildingError: error });
        return error
    }
}

export const editBuilding = async (id, { name }) => {
    try {
        await connectToDatabase()
        await buildings.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { $set: { name } },
            { new: true, runValidators: true }
        );
    }
    catch (error) {
        console.log({ editBuildingError: error });
        return error
    }
}

export const deleteBuilding = async ({ id, transferringBuildingId }) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if (transferringBuildingId) {
            const updateAssignedBuildingOfSelectedUsersError = await updateAssignedBuildingOfSelectedUsers({ deletingBuildingId: id, transferringBuildingId })
            if (updateAssignedBuildingOfSelectedUsersError) {
                throw new Error(updateAssignedBuildingOfSelectedUsersError?.error?.message || updateAssignedBuildingOfSelectedUsersError?.message || updateAssignedBuildingOfSelectedUsersError?.error)
            }
        }
        const updateAllManagingBuildingsOfFMsError = await updateAllManagingBuildingsOfFMs(id);
        if (updateAllManagingBuildingsOfFMsError) {
            throw new Error(updateAllManagingBuildingsOfFMsError?.error?.message || updateAllManagingBuildingsOfFMsError?.message || updateAllManagingBuildingsOfFMsError?.error)
        }
        await buildings.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
        await session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        console.log({ deleteBuildingError: error });
        await session.abortTransaction();
        session.endSession();
        return error
    }
}

export const getLocationsWithBuildings = async () => {
    try {
        await connectToDatabase()
        const locationsWithBuildings = await locations.aggregate([
            {
                $lookup: {
                    from: "buildings",
                    localField: "_id",
                    foreignField: "location",
                    as: "buildings",
                },
            },
            {
                $match: {
                    isDeleted: false,
                    buildings: {
                        $exists: true,
                        $ne: [],
                    },
                },
            },
            {
                $project: {
                    id: "$_id",
                    _id: 0,
                    name: 1,
                    buildings: {
                        $map: {
                            input: {
                                $filter: {
                                    input: "$buildings",
                                    as: "building",
                                    cond: {
                                        $eq: [
                                            "$$building.isDeleted",
                                            false,
                                        ],
                                    },
                                },
                            },
                            as: "building",
                            in: {
                                id: "$$building._id",
                                name: "$$building.name",
                            },
                        },
                    },
                },
            },
        ]);
        return JSON.parse(JSON.stringify(locationsWithBuildings))
    }
    catch (error) {
        console.log({ getLocationsWithBuildingsError: error });
        throw new Error(error)
    }
}

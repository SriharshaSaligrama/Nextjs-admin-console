import mongoose from "mongoose";
import { locations } from "../locations/model"; //importing locations model to avoid error of accessing buildings model without registering locations model, error occurs if you directly try to access buildings page before accessing locations page in ui.
import { buildings } from "./model";
import { connectToDatabase } from "../mongodb";

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
        const allBuildingsOfSelectedLocation = await buildings.find({ location: locationId, isDeleted: false });
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

export const addBuilding = async ({ name, locationId }) => {
    try {
        await connectToDatabase()
        const building = new buildings({ name, location: locationId })
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

export const deleteBuilding = async ({ id }) => {
    try {
        await buildings.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
    }
    catch (error) {
        console.log({ deleteBuildingError: error });
        return error
    }
}

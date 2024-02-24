import mongoose from "mongoose";
import { locations } from "./model";
import { connectToDatabase } from "../mongodb";

export const getLocations = async () => {
    try {
        await connectToDatabase()
        const allExistingLocations = await locations.find({ isDeleted: false }).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(allExistingLocations)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getLocationsError: error });
        throw new Error(error)
    }
};

export const getAllLocationsIncludingDeleted = async () => {
    try {
        await connectToDatabase()
        const allLocations = await locations.find();
        return JSON.parse(JSON.stringify(allLocations)) //JSON.parse(JSON.stringify()) is being used to avoid warning of toJSON method.
    }
    catch (error) {
        console.log({ getLocationsError: error });
        return error
    }
};

export const getLocation = async (id) => {
    try {
        await connectToDatabase()
        const location = await locations.findOne({
            _id: new mongoose.Types.ObjectId(id),
            isDeleted: false
        });
        return JSON.parse(JSON.stringify(location));
    }
    catch (error) {
        console.log({ getLocationbyIdError: error });
        return null          //returning null for handling not found error
    }
}

export const addLocation = async ({ name }) => {
    try {
        await connectToDatabase()
        const location = new locations({ name })
        await location.save()
    }
    catch (error) {
        console.log({ addLocationError: error });
        return error
    }
}

export const editLocation = async (id, { name }) => {
    try {
        await connectToDatabase()
        await locations.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { $set: { name } },
            { new: true, runValidators: true }
        );
    }
    catch (error) {
        console.log({ editLocationError: error });
        return error
    }
}

export const deleteLocation = async ({ id }) => {
    try {
        await locations.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
    }
    catch (error) {
        console.log({ deleteLocationError: error });
        return error
    }
}
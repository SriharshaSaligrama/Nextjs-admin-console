import mongoose from "mongoose";

const locationsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        minLength: [2, "Name should be minimum 2 characters"],
        maxLength: [120, "Name should not exceed 120 characters"],
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
})

export const locations = mongoose.models.locations || mongoose.model("locations", locationsSchema)
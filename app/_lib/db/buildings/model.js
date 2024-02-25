import mongoose from "mongoose";

const buildingsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        minLength: [2, "Name should be minimum 2 characters"],
        maxLength: [120, "Name should not exceed 120 characters"],
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "locations",
        required: [true, "Location is required"],
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
})

export const buildings = mongoose.models.buildings || mongoose.model("buildings", buildingsSchema)
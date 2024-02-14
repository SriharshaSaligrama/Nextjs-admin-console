import mongoose from "mongoose";

const departmentsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        min: 2,
        max: 120,
    },
    code: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        min: 2,
        max: 120,
    },
    description: {
        type: String,
        trim: true,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "departments",
        default: null
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

export const departments = mongoose.models.departments || mongoose.model("departments", departmentsSchema)
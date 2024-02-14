import mongoose from "mongoose";

const departmentsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        minLength: [2, "Name should be minimum 2 characters"],
        maxLength: [120, "Name should not exceed 120 characters"],
        unique: true,
    },
    code: {
        type: String,
        trim: true,
        required: [true, "Code is required"],
        minLength: [2, "Code should be minimum 2 characters"],
        maxLength: [120, "Code should not exceed 120 characters"],
        unique: true,
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
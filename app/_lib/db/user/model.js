import mongoose from "mongoose";
import { userRoles } from "../../constants";

const usersSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        minLength: [3, "Name should be minimum 3 characters"],
        maxLength: [120, "Name should not exceed 120 characters"],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: true,
        minLength: [3, "Name should be minimum 3 characters"],
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password is required"],
        minLength: [6, "Password should be minimum 6 characters"],
        maxLength: [128, "Password should not exceed 128 characters"],
    },
    role: {
        type: String,  //admin, employee, facility manager
        trim: true,
        enum: {
            values: userRoles,
            message: 'Role must be one of admin, employee or facility manager',
        },
        required: [true, "Role is required"],
    },
    buildingAssignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "buildings",
        required: [true, "Building is required"],
    },
    managingBuildings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'buildings',
            default: null
        },
    ],
    departmentAssignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "departments",
        default: null
    },
    theme: {
        type: String,
        trim: true,
        enum: {
            values: ['light', 'dark'],
            message: 'Theme must be either light or dark',
        },
        default: 'light',
    },
    isDeleted: {
        type: Boolean,
        default: false,
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

export const users = mongoose.models.users || mongoose.model("users", usersSchema)
import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
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
        ref: "categories",
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

export const categories = mongoose.models.categories || mongoose.model("categories", categoriesSchema)
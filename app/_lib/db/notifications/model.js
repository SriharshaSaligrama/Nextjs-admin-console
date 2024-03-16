import mongoose from "mongoose";

const notificationsSchema = new mongoose.Schema({
    services: [{
        name: {
            type: String,
            trim: true,
            required: [true, "Service is required"],
        },
        notificationType: {
            sms: {
                type: Boolean,
                default: false
            },
            email: {
                type: Boolean,
                default: false
            }
        },
        isActive: {
            type: Boolean,
            default: false
        }
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: [true, "Category is required"],
    }],
    departments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "departments"
    }],
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "groups"
    }],
    locations: [{
        location: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "locations",
        },
        buildings: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "buildings",
        }]
    }],
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

notificationsSchema.pre('save', async function (next) {
    const notification = this;

    // Validate department selection
    if (notification.departments.length > 0) {
        if (notification.groups.length > 0 || notification.locations.length > 0) {
            throw new Error('Departments cannot be selected with groups or locations');
        }
    }

    // Validate group selection
    if (notification.groups.length > 0) {
        if (notification.locations.length === 0) {
            throw new Error('Groups must have at least one location selected');
        }
        if (notification.departments.length > 0) {
            throw new Error('Groups cannot be selected with departments');
        }
    }

    // Validate location selection
    if (notification.locations.length > 0) {
        if (notification.groups.length === 0) {
            throw new Error('Locations can only be selected with groups');
        }
    }

    next();
});

export const notifications = mongoose.models.notifications || mongoose.model("notifications", notificationsSchema)
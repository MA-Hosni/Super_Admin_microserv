import mongoose from "mongoose";

const GroupPermissionSchema = new mongoose.Schema({
    groupName: { 
        type: String, 
        required: true,
    },
}, {
    timestamps: true,
});

const GroupPermission = mongoose.models.PermissionGroup || mongoose.model('PermissionGroup', GroupPermissionSchema);

export default GroupPermission;
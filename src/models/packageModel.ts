import mongoose from "mongoose";

const packSchema = new mongoose.Schema({
    packageName: { 
        type: String, 
        required: true, 
    },
    packagePrice: { 
        type: Number, 
        required: true, 
    },
    packageType: {
        type: String,
        enum: ['membership', 'per_user'], // Define possible values for packageType
        default: 'membership' // Default value for packageType
    },
    minUsers: {
        type: Number,
        default: 1 // Default value for minUsers
    },
    maxUsers: {
        type: Number,
        default: 10 // Default value for maxUsers
    },
    keyBenefits: [{
        type: String
    }],
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
})

const Package = mongoose.models.Plans || mongoose.model('Plans', packSchema);

export default Package;

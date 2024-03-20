import mongoose, { Schema, mongo } from "mongoose";

const packSchema = new mongoose.Schema({
    packageName: { 
        type: String, 
        required: true, 
    },
    packagePrice: { 
        type: Number, 
        required: true, 
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
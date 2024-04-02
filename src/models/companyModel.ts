import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    logo: { 
        type: String,
        default: "https://logos-world.net/wp-content/uploads/2023/05/Anonymous-Logo.png",
    },
    companyName: { 
        type: String, 
        required: true,
    },
    industry: { 
        type: String, 
        required: true, 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
    },
    phoneNumber: { 
        type: String, 
        required: true,
    },
    companyAnnivesary: { 
        type: Date,
    },
    companyAddress: { 
        type: String, 
        required: true, 
    },
    companyCity: { 
        type: String, 
        required: true, 
    },
    companyZipCode: { 
        type: String, 
        required: true,
    },
    companyCountry: { 
        type: String, 
        required: true, 
    },
    pricingPlan: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Plans', 
        required: true 
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})

const Company = mongoose.models.Company || mongoose.model('Company', companySchema);

export default Company;
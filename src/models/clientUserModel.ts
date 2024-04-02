import mongoose from "mongoose";

const ClientUserSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true,
    },
    lastName: { 
        type: String, 
        required: true,
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
    },
    password: { 
        type: String, 
        required: true, 
    },
    phoneNumber: { 
        type: String, 
        required: true,
    },
    cin: { 
        type: String, 
        required: true,
        unique: true,
    },
    role: { 
        type: String, 
        required: true,
    },
    profilePhoto: {
        type: String,
        default: "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    verifyToken: String,
    verifyTokenExpire: Date,
}, {
    timestamps: true,
});

const UserClient = mongoose.models.UserClient || mongoose.model('UserClient', ClientUserSchema);

export default UserClient;
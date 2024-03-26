import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
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
    matricule: { 
        type: String, 
        required: true,
        unique: true,
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
    dateofBirth: { 
        type: Date, 
        required: true, 
    },
    address: { 
        type: String, 
        required: true,
    },
    profilePhoto: {
        type: String,
        default: "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    twoFactor: {
        type: Boolean,
        default: false,
    },
    otpCode: String,
    otpCodeExpire: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpire: Date,
    verifyToken: String,
    verifyTokenExpire: Date,
}, {
    timestamps: true,
});

const User = mongoose.models.Manager || mongoose.model('Manager', userSchema);

export default User;
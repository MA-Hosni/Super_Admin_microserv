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
    isVerified: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpire: Date,
    verifyToken: String,
    verifyTokenExpire: Date,
}, {
    timestamps: true,
})


const User = mongoose.models.Managers || mongoose.model('Managers', userSchema);

export default User;
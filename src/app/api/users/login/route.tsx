import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";


connect()

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            toast.error("User does not exist");
            return NextResponse.json({error: "user does not exist"}, {status: 400})
        }

        //check if password is valid
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid Password"}, {status: 400})
        }

        //create token data
        const tokenData = {
            id: user._id,
            email: user.email
        }
        //create token 
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, {expiresIn: "1d"})

        const response = NextResponse.json({message: "Login successful", success: true})
        response.cookies.set("token", token, {httpOnly:true})
        return response;

    } catch (error: any) {
        toast.error("User does not exist");
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}
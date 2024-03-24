import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { otp } = reqBody;
        console.log(reqBody);

        // check if user exists
        const user = await User.findOne({
            otpCode: otp,
            otpCodeExpire: { $gt: Date.now() },
        });

        if (!user) {
            console.log("Invalid Code")
            return NextResponse.json({ error: "Invalid Code" }, { status: 400 });
        }
        
        user.otpCode = undefined;
        user.otpCodeExpire = undefined;
        await user.save();

        //create token data
        const tokenData = {
            id: user._id,
            email: user.email
        }
        //create token 
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, {expiresIn: "1d"})

        const response = NextResponse.json({message: "Login successful", success: true, reqBody})
        response.cookies.set("token", token, {httpOnly:true})
        return response;

        } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}
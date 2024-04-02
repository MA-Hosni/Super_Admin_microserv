import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/otpMail";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "user does not exist"}, {status: 400})
        }

        if(user.isDeleted){
            return NextResponse.json({error: "user does not exist"}, {status: 400})
        }

        //check if password is valid
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid Password"}, {status: 400})
        }

        // check 2FA
        const tfa = user.twoFactor;

        if(!tfa) {
            //create token data
            const tokenData = {
                id: user._id,
                email: user.email
            }
            //create token 
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, {expiresIn: "1d"})

            const response = NextResponse.json({message: "Login successful", success: true, tfa})
            response.cookies.set("token", token, {httpOnly:true})
            return response;
        }

        if(tfa) {
        // send otp email
        await sendEmail({email, userId: user._id})
        return NextResponse.json({
            message: "OTP Code sent successfully",
            success: true,
            tfa
        })
        }

        

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}
import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import GroupPermission from "@/models/permissionModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/helpers/mailer";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {firstName, lastName, email, password, matricule, phoneNumber, cin, dateofBirth, address, profilePhoto, permissionGroup} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            matricule,
            phoneNumber,
            cin,
            dateofBirth,
            address,
            profilePhoto,
            permissionGroup
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        // Add the newly created user to the chosen permission group
        const group = await GroupPermission.findById(permissionGroup);
        if (!group) {
            return NextResponse.json({error: "Permission group not found"}, {status: 404});
        }
 
        group.users.push(savedUser._id);
        await group.save();

        // send verification email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}
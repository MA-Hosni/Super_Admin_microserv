import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";



connect();

export async function PATCH(request:NextRequest) {


    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.json();
        const { firstName, lastName, email, matricule, phoneNumber, cin, dateofBirth, address } = reqBody;

        if (!firstName || !lastName || !phoneNumber || !dateofBirth || !address) {
            return NextResponse.json({
                error: "Missing required fields",
                success: false
            }, { status: 400 });
        }

        const user = await User.findByIdAndUpdate({_id: userId}, reqBody, { new: true });

        if (!user) {
            return NextResponse.json({
                error: "user not found",
                success: false
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "User updated successfully",
            success: true,
            user
        });
    } catch (error:any) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
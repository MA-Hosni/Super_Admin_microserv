import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import GroupPermission from "@/models/permissionModel";
import { connect } from "@/dbConfig/dbConfig";



connect();

export async function GET(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password -isVerified -createdAt -updatedAt").populate({
            path: 'group',
            select: '-users -createdAt -updatedAt' // Specify fields to select from User model
          });
        return NextResponse.json({message: "User found", user})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
import {connect} from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.json()
        const {action} = reqBody

        const user = await User.findOne({_id: userId});

        if (!user) {
            return NextResponse.json({
                error: "user not found",
                success: false
            }, { status: 404 });
        }

        if (action === 'Enable') {
            user.twoFactor = true;
            await user.save();
            console.log("Enabled");
        } else if (action === 'Disable') {
            user.twoFactor = false;
            await user.save();
            console.log("Disabled");
        }

        return NextResponse.json({
            message: "User updated successfully",
            success: true,
            user
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}
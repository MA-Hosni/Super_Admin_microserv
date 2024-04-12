import {connect} from "@/dbConfig/dbConfig";
import GroupPermission from "@/models/permissionModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function PATCH(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {id, name} = reqBody

        // Validate group name
        if (!name) {
            return NextResponse.json(
            { error: "Group name is required" },
            { status: 400 }
            );
        }

        // Find the group by ID and update the groupName field
        const updatedGroup = await GroupPermission.findByIdAndUpdate(
            id,
            { groupName: name },
            { new: true } // Return the updated document
        );
        
      

        if (!updatedGroup) {
            return NextResponse.json(
                { error: "Group not found" },
                { status: 404 }
            );
        }

        console.log("Group renamed successfully:", updatedGroup);

        return NextResponse.json({
            message: "Group renamed successfully",
            success: true,
            updatedGroup
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}
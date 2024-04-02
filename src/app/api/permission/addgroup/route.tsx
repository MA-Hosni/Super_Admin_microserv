import {connect} from "@/dbConfig/dbConfig";
import GroupPermission from "@/models/permissionModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {name} = reqBody

        // Validate group name
        if (!name) {
            return NextResponse.json(
            { error: "Group name is required" },
            { status: 400 }
            );
        }
        
        console.log(reqBody);
        
      // Create new group permission instance
      const newGroup = new GroupPermission({
        groupName: name,
      });

      // Save the new group permission to the database
      const savedGroup = await newGroup.save();
      console.log(savedGroup);

        return NextResponse.json({ message: "Group created successfully",
        success: true,
        savedGroup
    });

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}
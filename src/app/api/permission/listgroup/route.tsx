import {connect} from "@/dbConfig/dbConfig";
import GroupPermission from "@/models/permissionModel";
import { NextRequest, NextResponse } from "next/server";


connect()


export async function GET(req: NextRequest) {
    try {
        // Find all groups that are not deleted
        const groups = await GroupPermission.find({ isDeleted: false });

        // Map the groups to extract required fields
        const formattedGroups = groups.map(group => ({
            _id: group._id,
            groupName: group.groupName,
            users: group.users.length,
            isCustom: group.isCustom
        }));

        // Return the aggregated data
        return NextResponse.json(formattedGroups);
    } catch (error:any) {
        // Handle errors
        console.error("Error fetching packs:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
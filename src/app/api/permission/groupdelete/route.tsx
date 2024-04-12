import { connect } from "@/dbConfig/dbConfig";
import GroupPermission from "@/models/permissionModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PATCH(req:NextRequest, res:NextResponse ) {
  try {
        const reqBody = await req.json()
        const {_id} = reqBody

        // Find the group by ID
        const group = await GroupPermission.findById(_id);
        if (!group) {
            return NextResponse.json({ error: "Group not found" }, { status: 404 });
        }

        // Find the default group
        const defaultGroup = await GroupPermission.findById('660ea47dc3f3cc15080a8fe6');
        if (!defaultGroup) {
            return NextResponse.json({ error: "Default group not found" }, { status: 404 });
        }

        // Add users from the group to the default group
        defaultGroup.users.push(...group.users);

        // Update permissionGroup field of users in the group to default group ID
        await User.updateMany({ _id: { $in: group.users } }, { permissionGroup: defaultGroup._id });

        // Clear users from the group
        group.users = [];

        group.isDeleted = true;

        // Save changes to both groups
        await Promise.all([group.save(), defaultGroup.save()]);

        // Return success response
        return NextResponse.json({
            message: "Group deleted successfully",
            success: true,
        });
    } catch (error: any) {
        // Handle errors
        console.error("Error deleting group:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
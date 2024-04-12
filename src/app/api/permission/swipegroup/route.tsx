import { connect } from "@/dbConfig/dbConfig";
import GroupPermission from "@/models/permissionModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PATCH(req: NextRequest, res: NextResponse) {
    const url = req.nextUrl;
    const selectedGroupId = url.searchParams.get('id');

    try {
        if (!selectedGroupId) {
            return NextResponse.json({
                error: "No ID provided",
                success: false
            }, { status: 400 });
        }

        const reqBody = await req.json();
        const { currentGroupId, userId } = reqBody;

        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({
                error: "User not found",
                success: false
            }, { status: 404 });
        }

        // Find the group by currentGroupId
        const currentGroup = await GroupPermission.findById(currentGroupId);
        if (!currentGroup) {
            return NextResponse.json({
                error: "Current group not found",
                success: false
            }, { status: 404 });
        }

        // Find the selected group by selectedGroupId
        const selectedGroup = await GroupPermission.findById(selectedGroupId);
        if (!selectedGroup) {
            return NextResponse.json({
                error: "Selected group not found",
                success: false
            }, { status: 404 });
        }

        // Remove the user from the current group
        const index = currentGroup.users.indexOf(userId);
        if (index > -1) {
            currentGroup.users.splice(index, 1);
            await currentGroup.save();
        }

        // Update the user's permissionGroup field with selectedGroupId
        user.permissionGroup = selectedGroupId;
        await user.save();

        // Add the user to the selected group
        selectedGroup.users.push(userId);
        await selectedGroup.save();

        return NextResponse.json({
            message: "User's permission group updated successfully",
            success: true
        });
    } catch (error:any) {
        console.error("Error updating user's permission group:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
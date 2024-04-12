import { connect } from "@/dbConfig/dbConfig";
import GroupPermission from "@/models/permissionModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest, res: NextResponse) {
  const url = req.nextUrl;
  const id = url.searchParams.get('id');
  try {
    const group = await GroupPermission.findOne({ _id: id }).select("-createdAt -updatedAt");

    // Get the list of user IDs in the current permission group
    const userIdsInGroup = group.users.map((user:any) => user._id);

    // Find all users except those already in the current permission group and not deleted
    const users = await User.find({ 
      _id: { $nin: userIdsInGroup },
      isDeleted: false 
    }).select('_id profilePhoto firstName lastName');

    // Return the list of users
    return NextResponse.json(users); 
  } catch (error: any) {
    // Handle errors
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(req: NextRequest, res: NextResponse) {
  const url = req.nextUrl;
  const id = url.searchParams.get('id');
  try {
    const group = await GroupPermission.findOne({ _id: id }).select("-createdAt -updatedAt");
    const reqBody = await req.json()

    console.log(reqBody);
    // Iterate through each user ID
    for (const userId of reqBody) {
      // Find the user
      const user = await User.findById(userId);
      if (!user) {
        console.log(`User with ID ${userId} not found.`);
        continue; // Move to the next user ID if not found
      }

      console.log(`current grp of user ${userId} is ${user.permissionGroup}`)
      const currentGroup = await GroupPermission.findById(user.permissionGroup);
      if (!currentGroup) {
        return NextResponse.json({
            error: "Current group not found",
            success: false
        }, { status: 404 });
      }

      // Remove the user from the current group
      const index = currentGroup.users.indexOf(userId);
        if (index > -1) {
            currentGroup.users.splice(index, 1);
            await currentGroup.save();
        }
      
      // Update the user's permissionGroup field with new GroupId
      user.permissionGroup = id;
      await user.save();

      // Add the user to the selected group
      group.users.push(userId);
      await group.save();

    }


    return NextResponse.json({ message: "Employees added successfully",
        success: true,
        reqBody
    });
  } catch (error:any) {
    return NextResponse.json({error: error.message},
      {status: 500});
  }
}

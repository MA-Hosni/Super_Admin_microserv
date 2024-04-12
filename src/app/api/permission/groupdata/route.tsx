import { connect } from "@/dbConfig/dbConfig";
import GroupPermission from "@/models/permissionModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req:NextRequest, res:NextResponse ) {
  const url = req.nextUrl;
  const id = url.searchParams.get('id');
    try {
      const group = await GroupPermission.findOne({ _id: id }).select("-createdAt -updatedAt")
      .populate({
        path: 'users',
        select: '_id profilePhoto firstName lastName' // Specify fields to select from User model
      })
      ;
      // Return the packs
      return NextResponse.json(group); 
    } catch (error:any) {
        // Handle errors
        console.error("Error fetching packs:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
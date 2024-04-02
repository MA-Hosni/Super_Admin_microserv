import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PATCH(req:NextRequest, res:NextResponse ) {
  const url = req.nextUrl;
  const id = url.searchParams.get('id');
    try {
      const manager = await User.findByIdAndUpdate({ _id: id }, { $set: { isDeleted: true } });
      // Return the managers
      return NextResponse.json({
        message: "Manager deleted successfully",
        success: true,
    });
    } catch (error:any) {
        // Handle errors
        console.error("Error fetching managers:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
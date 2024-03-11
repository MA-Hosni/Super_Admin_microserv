import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(req:NextRequest, res:NextResponse ) {
  const url = req.nextUrl;
  const id = url.searchParams.get('id');
    try {
      const manager = await User.findOneAndDelete({ _id: id });
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
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req:NextRequest, res:NextResponse ) {
  const url = req.nextUrl;
  const id = url.searchParams.get('id');
    try {
      const manager = await User.findOne({ _id: id }).select("-password -isVerified -createdAt -updatedAt");
      // Return the managers
      return NextResponse.json(manager); 
    } catch (error:any) {
        // Handle errors
        console.error("Error fetching managers:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

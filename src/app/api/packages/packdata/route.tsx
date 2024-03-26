import { connect } from "@/dbConfig/dbConfig";
import Pack from "@/models/packageModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req:NextRequest, res:NextResponse ) {
  const url = req.nextUrl;
  const id = url.searchParams.get('id');
    try {
      const pack = await Pack.findOne({ _id: id }).select("-createdAt -updatedAt");
      // Return the packs
      return NextResponse.json(pack); 
    } catch (error:any) {
        // Handle errors
        console.error("Error fetching packs:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

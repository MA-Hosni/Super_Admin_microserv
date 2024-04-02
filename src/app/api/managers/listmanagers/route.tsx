import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect()


export async function GET(req: NextRequest) {
    try {
        // Retrieve managers from the database
        const managers = await User.find({ isDeleted: false });
        // Return the managers
        return NextResponse.json(managers); // Return a NextResponse with JSON data
    } catch (error:any) {
        // Handle errors
        console.error("Error fetching managers:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
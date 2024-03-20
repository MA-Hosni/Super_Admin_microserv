import {connect} from "@/dbConfig/dbConfig";
import Pack from "@/models/packageModel";
import { NextRequest, NextResponse } from "next/server";


connect()


export async function GET(req: NextRequest) {
    try {
        // Retrieve packs from the database
        const packs = await Pack.find({});
        // Return the packs
        return NextResponse.json(packs); // Return a NextResponse with JSON data
    } catch (error:any) {
        // Handle errors
        console.error("Error fetching packs:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
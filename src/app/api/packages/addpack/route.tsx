import {connect} from "@/dbConfig/dbConfig";
import Pack from "@/models/packageModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        console.log(reqBody);
        if (!reqBody.packageType) {
            return NextResponse.json(
                { error: "packageType is required" },
                { status: 400 }
            );
        }
        // Create a new package document using the Pack model
        const newPackage = new Pack({
            packageName: reqBody.packageName,
            packagePrice: reqBody.packagePrice,
            packageType: reqBody.packageType,
            minUsers: reqBody.minUsers,
            maxUsers: reqBody.maxUsers,
            keyBenefits: reqBody.keyBenefits
        });

        // Save the new package to the database
        await newPackage.save();

        return NextResponse.json({ message: "Package created successfully" });

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}
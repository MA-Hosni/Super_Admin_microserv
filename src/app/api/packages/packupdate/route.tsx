import { connect } from "@/dbConfig/dbConfig";
import Pack from "@/models/packageModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PATCH(req: NextRequest, res: NextResponse) {
    const url = req.nextUrl;
    const id = url.searchParams.get('id');

    try {
        if (!id) {
            return NextResponse.json({
                error: "No ID provided",
                success: false
            }, { status: 400 });
        }

        const reqBody = await req.json();
        const { packageName, packagePrice, keyBenefits } = reqBody;

        if (!packageName || !packagePrice || !keyBenefits) {
            return NextResponse.json({
                error: "Missing required fields",
                success: false
            }, { status: 400 });
        }

        const updatedPackage = await Pack.findByIdAndUpdate(id, reqBody, { new: true });

        if (!updatedPackage) {
            return NextResponse.json({
                error: "Package not found",
                success: false
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Package updated successfully",
            success: true,
            updatedPackage
        });
    } catch (error:any) {
        console.error("Error updating package:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
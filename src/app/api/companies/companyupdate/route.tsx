import { connect } from "@/dbConfig/dbConfig";
import Company from "@/models/companyModel";
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
        const {logo, companyName, industry, companyAddress, companyCity, companyZipCode, companyCountry, email, phoneNumber, pricingPlan } = reqBody;

        if (!companyName || !industry || !email || !companyAddress || !phoneNumber || !companyCity || !companyZipCode || !companyCountry) {
            return NextResponse.json({
                error: "Missing required fields",
                success: false
            }, { status: 400 });
        }

        const company = await Company.findByIdAndUpdate(id, reqBody, { new: true });

        if (!company) {
            return NextResponse.json({
                error: "company not found",
                success: false
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "company updated successfully",
            success: true,
            company
        });
    } catch (error:any) {
        console.error("Error updating company:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
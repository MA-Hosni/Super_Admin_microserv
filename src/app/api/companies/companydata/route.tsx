import { connect } from "@/dbConfig/dbConfig";
import Company from "@/models/companyModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req:NextRequest, res:NextResponse ) {
  const url = req.nextUrl;
  const id = url.searchParams.get('id');
    try {
      const company = await Company.findOne({ _id: id }).populate('pricingPlan').select("-createdAt -updatedAt");
      // Return the Company
      return NextResponse.json(company); 
    } catch (error:any) {
        // Handle errors
        console.error("Error fetching packs:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
import { connect } from "@/dbConfig/dbConfig";
import Company from "@/models/companyModel";
import UserClient from "@/models/clientUserModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(req:NextRequest, res:NextResponse ) {
  const url = req.nextUrl;
  const id = url.searchParams.get('id');
  try {
    // Delete all UserClient documents associated with the company
    await UserClient.deleteMany({ company: id });

    // Delete the company
    const company = await Company.findOneAndDelete({ _id: id });

    // Return success response
    return NextResponse.json({
        message: "Company and associated UserClients deleted successfully",
        success: true,
        deletedCompany: company,
    });
} catch (error: any) {
    // Handle errors
    console.error("Error deleting company and associated UserClients:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
}
}
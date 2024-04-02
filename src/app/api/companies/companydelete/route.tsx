import { connect } from "@/dbConfig/dbConfig";
import Company from "@/models/companyModel";
import UserClient from "@/models/clientUserModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PATCH(req:NextRequest, res:NextResponse ) {
  const url = req.nextUrl;
  const id = url.searchParams.get('id');
  try {
        // // Delete all UserClient documents associated with the company
        // await UserClient.deleteMany({ company: id });

        // // Delete the company
        // const company = await Company.findOneAndDelete({ _id: id });

        // Update isDeleted field to true for all associated UserClients
        await UserClient.updateMany({ company: id }, { $set: { isDeleted: true } });

        // Update isDeleted field to true for the company
        const company = await Company.findByIdAndUpdate(id, { $set: { isDeleted: true } }, { new: true });

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
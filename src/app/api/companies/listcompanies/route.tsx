import {connect} from "@/dbConfig/dbConfig";
import Company from "@/models/companyModel";
import UserClient from "@/models/clientUserModel";
import { NextRequest, NextResponse } from "next/server";


connect()


export async function GET(req: NextRequest) {
    try {
        // Aggregate the data to get all companies along with the count of associated UserClients
        const companiesWithUserCounts = await Company.aggregate([
            {
                $match: { isDeleted: false } // Match only non-deleted companies
            },
            {
                $lookup: {
                    from: "userclients", // Collection name of UserClient model
                    localField: "_id", // Field from Company model
                    foreignField: "company", // Field from UserClient model
                    as: "userClients" // Field name to store the array of matched UserClients
                }
            },
            {
                $project: {
                    _id: 1, // Include the company _id field
                    logo: 1,
                    companyName: 1, // Include the company name field
                    industry: 1, // Include the company industry field
                    email: 1,
                    phoneNumber: 1,
                    companyAddress: 1,
                    employees: { $size: "$userClients" } // Calculate the count of matched UserClients
                }
            }
        ]);

        // Return the aggregated data
        return NextResponse.json(companiesWithUserCounts);
    } catch (error:any) {
        // Handle errors
        console.error("Error fetching packs:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
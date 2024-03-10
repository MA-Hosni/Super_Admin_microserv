import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

// export async function PATCH(req:NextRequest, res:NextResponse ) {
//   const url = req.nextUrl;
//   const id = url.searchParams.get('id');
//     try {
//         const reqBody = await req.json()
//         const {firstName, lastName, email, matricule, phoneNumber, cin, dateofBirth, address} = reqBody
//         console.log(reqBody);
//         console.log(id)
//         // if(id && reqBody) {
//         //     const manager = await User.findByIdAndUpdate(id, reqBody);
//         //     return NextResponse.json({
//         //         message: "User updated successfully",
//         //         success: true,
//         //         manager
//         //     })
//         // }
//         // const manager = await User.findOne({ _id: id }).select("-password -isVerified -createdAt -updatedAt");
//         // Return the managers
//         return NextResponse.json({message: "body", reqBody});
//     } catch (error:any) {
//         // Handle errors
//         console.error("Error fetching managers:", error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//   }
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
        const { firstName, lastName, email, matricule, phoneNumber, cin, dateofBirth, address } = reqBody;

        if (!firstName || !lastName || !email || !matricule || !phoneNumber || !cin || !dateofBirth || !address) {
            return NextResponse.json({
                error: "Missing required fields",
                success: false
            }, { status: 400 });
        }

        const manager = await User.findByIdAndUpdate(id, reqBody, { new: true });

        if (!manager) {
            return NextResponse.json({
                error: "Manager not found",
                success: false
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Manager updated successfully",
            success: true,
            manager
        });
    } catch (error:any) {
        console.error("Error updating manager:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
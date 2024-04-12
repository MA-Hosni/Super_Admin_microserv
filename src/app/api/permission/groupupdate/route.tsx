import { connect } from "@/dbConfig/dbConfig";
import GroupPermission from "@/models/permissionModel";
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
        const {
            viewAllManagers,
            viewManagerDetails,
            deleteManager,
            addNewManager,
            editManagerDetails,
            viewAllCompanies,
            viewCompanyDetails,
            deleteCompany,
            addNewCompany,
            editCompanyDetails,
            viewAllPackages,
            viewPackageDetails,
            deletePackage,
            addNewPackage,
            editPackageDetails,
            viewAllPermissions,
            viewPermissionDetails,
            deletePermission,
            addNewPermission,
            editPermissionDetails,
            assignUsers,
        } = reqBody;

        console.log(reqBody);

        const group = await GroupPermission.findByIdAndUpdate(id, reqBody, { new: true });

        if (!group) {
            return NextResponse.json({
                error: "Group not found",
                success: false
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Group updated successfully",
            success: true,
            group
        });
    } catch (error:any) {
        console.error("Error updating group:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
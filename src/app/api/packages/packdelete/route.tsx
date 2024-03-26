import { connect } from "@/dbConfig/dbConfig";
import Pack from "@/models/packageModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(req:NextRequest, res:NextResponse ) {
  const url = req.nextUrl;
  const id = url.searchParams.get('id');
    try {
      const manager = await Pack.findOneAndDelete({ _id: id });
      // Return the managers
      return NextResponse.json({
        message: "Manager deleted successfully",
        success: true,
    });
    } catch (error:any) {
        // Handle errors
        console.error("Error fetching managers:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

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

        // Find the package by ID
        const packageToUpdate = await Pack.findById(id);

        // Check if the package exists
        if (!packageToUpdate) {
            return NextResponse.json({
                error: "Package not found",
                success: false
            }, { status: 404 });
        }

        // Set isActive field to opposite
        packageToUpdate.isActive = !packageToUpdate.isActive;

        // Save the updated package
        await packageToUpdate.save();

        return NextResponse.json({
            message: "Package updated successfully",
            success: true,
        });
    } catch (error:any) {
        console.error("Error updating package:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
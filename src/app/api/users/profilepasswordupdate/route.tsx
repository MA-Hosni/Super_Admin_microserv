import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import toast from "react-hot-toast";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const reqBody = await request.json();
    const { oldPassword, newPassword } = reqBody;
    console.log(reqBody);

    //check if user exists
    const user = await User.findOne({_id: userId})
    if(!user){
        toast.error("User does not exist");
        return NextResponse.json({error: "user does not exist"}, {status: 400})
    }

    //check if password is valid
    const validPassword = await bcrypt.compare(oldPassword, user.password)
    if(!validPassword){
        return NextResponse.json({error: "Invalid Password"}, {status: 400})
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

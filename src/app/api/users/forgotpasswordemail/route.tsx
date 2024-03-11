import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import toast from "react-hot-toast";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      toast.error("User does not exist");
      return NextResponse.json(
        { error: "User Does not exist" },
        { status: 400 }
      );
    }

    await sendEmail({ email, emailType: "RESET", userId: user._id });


    toast.success("Forgot password email sent");
    return NextResponse.json({ message: "Forgot password email sent" }, {status: 200});

  } catch (error: any) {
    toast.error("catch error fil api forgotpassword mail");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

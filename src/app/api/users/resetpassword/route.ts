import User from "@/models/userModel";
import connectDb from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

connectDb();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { password, token } = reqBody;

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const user = await User.findOne({
			forgotPasswordToken: token,
			forgotPasswordTokenExpiry: { $gt: Date.now() },
		});

		if (!user) {
			return NextResponse.json(
				{ error: "Invalid or expired token" },
				{ status: 400 }
			);
		}

		user.password = hashedPassword;
		user.forgotPasswordToken = undefined;
		user.forgotPasswordTokenExpiry = undefined;

		await user.save();

		return NextResponse.json(
			{
				message: "Password reset successfully",
				success: true,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}

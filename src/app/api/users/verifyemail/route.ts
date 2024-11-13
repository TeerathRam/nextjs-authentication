import User from "@/models/userModel";
import connectDb from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";

connectDb();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const token = reqBody.token;
		console.log("TOKEN", token);

		const user = await User.findOne({
			verifyToken: token,
			verifyTokenExpiry: { $gt: Date.now() },
		});

		if (!user) {
			return NextResponse.json(
				{ error: "Invalid or expired token" },
				{ status: 400 }
			);
		}

		user.isVerified = true;
		user.verifyToken = undefined;
		user.verifyTokenExpiry = undefined;

		await user.save();

		return NextResponse.json({
			message: "Email verified successfully",
			success: true,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}

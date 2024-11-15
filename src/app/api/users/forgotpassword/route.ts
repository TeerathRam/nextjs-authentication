import User from "@/models/userModel";
import connectDb from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connectDb();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { email } = reqBody;

		const user = await User.findOne({ email });

		if (!user) {
			return NextResponse.json(
				{ error: "User with email not found" },
				{ status: 400 }
			);
		}

		await sendEmail({
			email,
			emailType: "RESET",
			userId: user._id,
		});

		return NextResponse.json(
			{ message: "Email sent successfully" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}

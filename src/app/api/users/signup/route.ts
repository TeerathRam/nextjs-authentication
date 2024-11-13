import connectDb from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDb();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { username, password, email } = reqBody;

		console.log("REQBODY", reqBody);

		// Check for user
		const user = await User.findOne({ email });
		if (user) {
			return NextResponse.json(
				{ error: "User with email already exist" },
				{ status: 400 }
			);
		}

		// hash password
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const newUser = new User({
			email,
			username,
			password: hashedPassword,
		});

		const savedUser = await newUser.save();
		console.log("SAVED USER", savedUser);

		await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

		return NextResponse.json(
			{
				message: "User created successfuly",
				success: true,
				savedUser,
			},
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

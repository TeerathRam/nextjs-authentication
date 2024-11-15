import connectDb from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDb();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { email, password } = reqBody;

		// Check for the user
		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json(
				{ error: "User with email not found" },
				{ status: 400 }
			);
		}

		//Verify password
		const validPassword = await bcryptjs.compare(password, user.password);
		if (!validPassword) {
			return NextResponse.json({ error: "Invalid passwrod" }, { status: 400 });
		}

		//Create token
		const tokenData = {
			id: user._id,
			username: user.username,
			email: user.email,
		};

		const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
			expiresIn: "1d",
		});

		const response = NextResponse.json(
			{
				message: "Login successfully",
				success: true,
			},
			{ status: 200 }
		);

		response.cookies.set("token", token, { httpOnly: true });

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

import getDataFromToken from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import connectDb from "@/dbConfig/dbConfig";

connectDb();

export async function GET(request: NextRequest) {
	try {
		const userId = await getDataFromToken(request);
		const user = await User.findOne({ _id: userId }).select("-password");

		return NextResponse.json(
			{ message: "User found", data: user },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}

"use client";

import React from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Profile() {
	const router = useRouter();

	const logout = async () => {
		try {
			await axios.get("/api/users/logout");
			toast("Logout successfully");
			router.push("/login");
		} catch (error: any) {
			console.log("Logout failed", error);
			toast(error.message);
		}
	};
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<h1 className="text-3xl font-bold">Profile</h1>
			<p className="text-white">Profile page</p>
			<button
				onClick={logout}
				className="bg-blue-500  rounded-lg text-white px-4 py-2 mt-4"
			>
				Logout
			</button>
		</div>
	);
}

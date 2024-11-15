"use client";

import React from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Profile() {
	const router = useRouter();
	const [data, setData] = React.useState("nothing");

	const logout = async () => {
		try {
			await axios.get("/api/users/logout");
			toast.success("Logout successfully");
			router.push("/login");
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const getUserDetails = async () => {
		try {
			const user = await axios.get("/api/users/loggedInUser");
			setData(user.data.data._id);
			toast.success("User details fetched");
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<h1 className="text-3xl font-bold">Profile</h1> <hr />
			<p className="text-white mt-4">Profile page</p>
			<h2 className="bg-red-300 text-3xl p-3 mt-4 text-black rounded-xl font-serif">
				{data === "nothing" ? (
					"Nothing"
				) : (
					<Link href={`/profile/${data}`}>{data}</Link>
				)}
			</h2>
			<button
				onClick={logout}
				className="bg-blue-500  rounded-lg text-white px-4 py-2 mt-4"
			>
				Logout
			</button>
			<button
				onClick={getUserDetails}
				className="bg-orange-300 rounded-lg text-black px-4 py-2 mt-4"
			>
				Get User
			</button>
			<Toaster />
		</div>
	);
}

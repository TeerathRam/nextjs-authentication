"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
	const [token, setToken] = React.useState("");
	const [password, setPassword] = React.useState("");

	const router = useRouter();

	useEffect(() => {
		const urlToken = window.location.search.split("=")[1];
		setToken(urlToken || "");
	}, []);

	const resetPassword = async () => {
		try {
			const response = await axios.post("/api/users/resetpassword", {
				token,
				password,
			});
			toast.success(response.data.message);
			router.push("/login");
		} catch (error: any) {
			toast.error(error.response.data.error);
		}
	};

	return (
		<div className="min-h-screen flex flex-col justify-center items-center">
			<h1 className="text-3xl font-bold">Reset Password</h1>
			<div className="flex flex-col gap-4 m-4">
				<label htmlFor="password">Enter New Password</label>
				<input
					type="password"
					value={password}
					className="p-2 border border-gray-300 rounded-md text-black"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					className="p-2 border border-gray-300 rounded-md"
					onClick={resetPassword}
				>
					{" "}
					Reset
				</button>
			</div>
			<Toaster />
		</div>
	);
}

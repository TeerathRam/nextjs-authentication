"use client";

import React, { useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPassword() {
	const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [email, setEmail] = React.useState("");

	useEffect(() => {
		if (email.length > 0) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}, [email]);

	const onForgotPassword = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/forgotpassword", { email });
			toast.success(response.data.message);
		} catch (error: any) {
			toast.error(error.response.data.error);
		}
	};

	return (
		<div className="min-h-screen flex flex-col justify-center items-center">
			<h1 className="text-3xl font-bold">Forgot Password</h1>
			<div className="flex flex-col gap-4">
				<input
					type="email"
					className="p-2 border border-gray-300 rounded-md text-black"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button
					className="p-2 border border-gray-300 rounded-md"
					disabled={isButtonDisabled}
					onClick={onForgotPassword}
				>
					{loading ? "Loading..." : "Submit"}
				</button>
			</div>
			<Toaster />
		</div>
	);
}

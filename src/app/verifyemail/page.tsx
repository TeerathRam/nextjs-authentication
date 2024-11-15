"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyEmail() {
	const [isVerified, setIsVerified] = useState(false);
	const [token, setToken] = useState("");
	const [error, setError] = useState(false);

	const verifyUserEmail = async () => {
		try {
			await axios.post("/api/users/verifyemail", { token });
			setIsVerified(true);
		} catch (error: any) {
			setError(error.response.data.error);
			toast.error(error.response.data.error);
		}
	};
	useEffect(() => {
		const urlToken = window.location.search.split("=")[1];
		setToken(urlToken || "");
	}, []);

	useEffect(() => {
		if (token.length > 0) {
			verifyUserEmail();
		}
	}, [token]);

	return (
		<div className="min-h-screen flex flex-col justify-center items-center">
			<h1 className="text-3xl font-bold">Verify Email</h1>
			<h2 className="text-2xl p-2 bg-violet-300 text-black">
				{token ? `${token}` : "Token not found"}
			</h2>
			{isVerified && (
				<div>
					<p className="bg-gray-300 text-2xl mt-4 text-black">Email Verified</p>
					<Link href="/login">Login</Link>
				</div>
			)}
			{error && <p className="bg-gray-300 text-2xl mt-4 text-black">{error}</p>}
			<Toaster />
		</div>
	);
}

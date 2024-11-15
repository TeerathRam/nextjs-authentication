"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
	const router = useRouter();
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [user, setUser] = React.useState({
		email: "",
		password: "",
	});

	useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}, [user]);

	const onLogin = async () => {
		try {
			setIsLoading(true);
			const res = await axios.post("/api/users/login", user);

			toast.success(res.data.message);

			router.push("/profile");
		} catch (error: any) {
			toast.error(error.response.data.error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<h1 className="text-3xl font-bold">
				{isLoading ? "Please wait" : "Login"}
			</h1>
			<label className="mt-4" htmlFor="email">
				Email
			</label>
			<input
				className="border border-solid border-black p-2 rounded-xl w-[300px] font-bold text-black"
				type="email"
				placeholder="email"
				value={user.email}
				name="email"
				onChange={(e) => setUser({ ...user, email: e.target.value })}
			/>
			<label className="mt-3" htmlFor="password">
				Password
			</label>
			<input
				className="border border-solid border-black p-2 rounded-xl w-[300px] text-black"
				type="password"
				placeholder="password"
				value={user.password}
				name="password"
				onChange={(e) => setUser({ ...user, password: e.target.value })}
			/>
			<button
				className={`mt-6 mb-4 border border-solid border-black p-2 rounded-xl w-[300px] font-bold text-black ${
					isButtonDisabled ? "bg-gray-400" : "bg-green-300"
				}`}
				onClick={onLogin}
			>
				Login
			</button>
			<Link href="/signup">Signup here</Link>
			<Toaster />
		</div>
	);
}

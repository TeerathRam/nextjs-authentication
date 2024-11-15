"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
	const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const router = useRouter();

	const [user, setUser] = React.useState({
		email: "",
		password: "",
		username: "",
	});

	useEffect(() => {
		if (
			user.email.length > 0 &&
			user.password.length > 0 &&
			user.username.length > 0
		) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}, [user]);

	const onSignup = async () => {
		try {
			setLoading(true);
			const res = await axios.post("/api/users/signup", user);

			toast.success("Signup successfully");

			router.push("/login");
		} catch (error: any) {
			toast.error(error.response.data.error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center h-screen bg-gray-500">
			<h1 className="text-3xl font-bold">
				{loading ? "Please wait" : "Signup"}
			</h1>
			<label className="mt-4" htmlFor="username">
				Username
			</label>
			<input
				className="border border-solid border-black p-2 rounded-xl w-[300px] font-bold text-black"
				type="text"
				name="username"
				value={user.username}
				placeholder="username"
				onChange={(e) => setUser({ ...user, username: e.target.value })}
			/>
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
			<label className="mt-4" htmlFor="password">
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
				className={`my-4 border border-solid border-black p-2 rounded-xl w-[300px] font-bold text-black ${
					isButtonDisabled ? "bg-gray-400" : "bg-green-300"
				}`}
				onClick={onSignup}
			>
				{isButtonDisabled ? "Please fill all the fields" : "Signup"}
			</button>
			<Link href="/login">Login here</Link>
			<Toaster />
		</div>
	);
}

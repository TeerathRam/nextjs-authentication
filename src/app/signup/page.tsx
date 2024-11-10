"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";

export default function Signup() {
	const [user, setUser] = React.useState({
		email: "",
		password: "",
		username: "",
	});

	const onSignup = async () => {};

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<h1 className="text-3xl font-bold">Signup</h1>
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
				className="my-4 border border-solid border-black p-2 rounded-xl w-[300px] font-bold text-black bg-gray-200"
				onClick={onSignup}
			>
				Signup
			</button>
			<Link href="/login">Login here</Link>
		</div>
	);
}

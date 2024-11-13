import mongoose from "mongoose";
import toast from "react-hot-toast";

export default async function connectDb() {
	try {
		await mongoose.connect(process.env.MONGO_URI!);
		const connection = mongoose.connection;

		connection.on("connected", () => {
			// console.log("Connected to database");
			toast.success("Connected to database");
		});

		connection.on("error", (err) => {
			console.log("Error connecting to database", err);
			toast.error("Error connecting to database");
		});
	} catch (error: any) {
		console.log(error);
		// console.log("Error connecting to database");
		toast.error("Error connecting to database");
	}
}

import mongoose from "mongoose";
import toast from "react-hot-toast";

export default async function connectDb() {
	try {
		await mongoose.connect(process.env.MONGO_URI!);
		const connection = mongoose.connection;

		connection.on("connected", () => {
			toast.success("Connected to database");
		});

		connection.on("error", (err) => {
			toast.error(err.message);
		});
	} catch (error: any) {
		toast.error(error.message);
	}
}

import mongoose from "mongoose";

export default async function dbConfig() {
	try {
		await mongoose.connect(process.env.MONGO_URL!);
		const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to database");
    })

    connection.on("error", (err) => {
      console.log("Error connecting to database", err);  
    })

	} catch (error) {
		console.log(error);
		console.log("Error connecting to database");
	}
}

import mongoose from "mongoose";

mongoose.connection.once("open", () => {
	console.log("MongoDb connected");
});

mongoose.connection.on("error", (err) => {
	console.log("MongoDb error:", err);
});

export async function mongoConnect(mongo:string) {
	try {
		await mongoose.connect(mongo);
	} catch (err) {
		console.log(err);
	}
}

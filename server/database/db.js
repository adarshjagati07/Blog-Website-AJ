import mongoose from "mongoose";
const Connection = async (username, password) => {
	const URL = `mongodb+srv://${username}:${password}@blog-website-aj.vpoevft.mongodb.net/?retryWrites=true&w=majority`;
	try {
		await mongoose.connect(URL, { useNewUrlParser: true });
		console.log("DataBase connected Successfully");
	} catch (error) {
		console.log("Error while connecting with the Database", error);
	}
};

export default Connection;

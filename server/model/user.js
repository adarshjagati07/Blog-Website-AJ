import mongoose from "mongoose";
//we are going to create schema over here of our signup user

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

const User = mongoose.model("User", userSchema);
export default User;

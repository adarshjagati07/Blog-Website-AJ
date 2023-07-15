import User from "../model/user.js";
import byrypt from "bcrypt";

export const signupUser = async (request, response) => {
	try {
		const salt = await byrypt.genSalt();
		const hashedPassword = await byrypt.hash(request.body.password, salt);

		const user = {
			username: request.body.username,
			name: request.body.name,
			password: hashedPassword
		};
		const newUser = new User(user);
		await newUser.save();
		return response.status(200).json({ msg: `Signup successfull` });
	} catch (error) {
		return response.status(500).json({ msg: `Error while user signup` });
	}
};

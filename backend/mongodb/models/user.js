import mongoose from "mongoose"

const User = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	image: { type: String, required: false },
	cover: { type: String, required: false },
	city: { type: String, required: false },
	website: { type: String, required: false },
})

const UserSchema = mongoose.model('User', User)

export default UserSchema
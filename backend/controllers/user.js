import mongoose from "mongoose"
import User from "../mongodb/models/user.js"

export const getUser = async (req, res) => {
	const { _id } = req.query
	await User.aggregate([
		{
			$match: { _id: new mongoose.Types.ObjectId(_id) }
		},
		{
			$unset: "password"
		},
	])
		.then((data) => {
			if (data) {
				res.status(200).json({ success: true, data: data[0] })
			} else {
				res.status(404).json({ success: false, data: "User not found" })
			}
		})
		.catch((error) => {
			res.status(500).json({ success: false, message: error.message })
		})
}
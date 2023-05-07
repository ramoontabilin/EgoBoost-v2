import jwt from 'jsonwebtoken'
import mongoose from "mongoose"
import Follow from "../mongodb/models/follow.js"

export const getFollow = async (req, res) => {
	const token = req.cookies.accessToken
	if (!token) return res.status(401).json({ success: false, message: "Not logged in." })
	jwt.verify(token, "secretkey", async (error, userInfo) => {
		if (error) return res.status(403).json({ success: false, message: "Token is not valid." })
		const { followerUserID } = req.query
		const followedUserID = userInfo.id
		await Follow.findOne({
			followerUserID,
			followedUserID
		})
			.then((data) => {
				res.status(200).json({ success: true, data: data })
			})
			.catch((error) => {
				res.status(500).json({ success: false, message: error.message })
			})
	})
}

export const getFollowList = async (req, res) => {

}

export const getFollowSuggestList = async (req, res) => {
	const token = req.cookies.accessToken
	if (!token) return res.status(401).json({ success: false, message: "Not logged in." })
	jwt.verify(token, "secretkey", async (error, userInfo) => {
		if (error) return res.status(403).json({ success: false, message: "Token is not valid." })
		await Follow.aggregate([
			{
				$match: { "followedUserID": new mongoose.Types.ObjectId(userInfo.id) },
			},
			{
				$group: {
					_id: null,
					followList: {
						$addToSet: "$followerUserID"
					},
					followUser: {
						$addToSet: "$followedUserID",
					},
				}
			},
			{
				$set: { "list": { $concatArrays: ["$followList", "$followUser"] } }
			},
			{
				$lookup:
				{
					from: "users",
					let: { "list": "$list" },
					pipeline: [{
						$match: {
							$expr: {
								$not: {
									$in: ["$_id", "$$list"]
								}
							}
						}
					}],
					as: "result"
				}
			},
			{
				$unset: ["followList", "followUser", "list", "result.password"]
			},
		])
			.then((data) => {
				res.status(200).json({ success: true, data: data })
			})
			.catch((error) => {
				res.status(500).json({ success: false, message: error.message })
			})
	})
}

export const addFollow = async (req, res) => {
	const token = req.cookies.accessToken
	if (!token) return res.status(401).json({ success: false, message: "Not logged in." })
	jwt.verify(token, "secretkey", async (error, userInfo) => {
		if (error) return res.status(403).json({ success: false, message: "Token is not valid." })
		const { followerUserID } = req.body
		const followedUserID = userInfo.id
		await Follow.create({
			followerUserID,
			followedUserID
		})
			.then((data) => {
				res.status(200).json({ success: true, data: data })
			})
			.catch((error) => {
				res.status(500).json({ success: false, message: error.message })
			})
	})
}

export const deleteFollow = async (req, res) => {
	const token = req.cookies.accessToken
	if (!token) return res.status(401).json({ success: false, message: "Not logged in." })
	jwt.verify(token, "secretkey", async (error, userInfo) => {
		if (error) return res.status(403).json({ success: false, message: "Token is not valid." })
		const { followerUserID } = req.query
		const followedUserID = userInfo.id
		await Follow.deleteOne({
			followerUserID,
			followedUserID
		})
			.then((data) => {
				res.status(200).json({ success: true, data: data })
			})
			.catch((error) => {
				res.status(500).json({ success: false, message: error.message })
			})
	})
}
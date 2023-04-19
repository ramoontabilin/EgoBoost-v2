import mongoose from "mongoose"

const Like = new mongoose.Schema({
	userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
	postID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
})

const LikeSchema = mongoose.model('Like', Like)

export default LikeSchema
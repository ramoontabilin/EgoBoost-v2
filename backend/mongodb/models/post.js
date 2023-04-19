import mongoose from "mongoose"

const Post = new mongoose.Schema({
	description: { type: String, required: true },
	image: { type: String, required: false },
	createdAt: { type: Date, required: true },
	userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
})

const PostSchema = mongoose.model('Post', Post)

export default PostSchema
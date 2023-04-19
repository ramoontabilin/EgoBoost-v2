import mongoose from "mongoose"

const Story = new mongoose.Schema({
	image: { type: String, required: true },
	createdAt: { type: Date, required: true },
	userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
})

const StorySchema = mongoose.model('Story', Story)

export default StorySchema
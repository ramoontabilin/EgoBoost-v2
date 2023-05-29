import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import connectDB from "./mongodb/connect.js"
import authRoute from "./routes/auth.js"
import commentRoute from "./routes/comment.js"
import followRoute from "./routes/follow.js"
import generateRoute from "./routes/generate.js"
import likeRoute from "./routes/like.js"
import postRoute from "./routes/post.js"
import userRoute from "./routes/user.js"

dotenv.config()
const app = express()
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization")
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
	next()
})
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/comment', commentRoute)
app.use('/api/v1/follow', followRoute)
app.use('/api/v1/generate', generateRoute)
app.use('/api/v1/like', likeRoute)
app.use('/api/v1/post', postRoute)
app.use('/api/v1/user', userRoute)
app.get('/', async (req, res) => {
	res.send("Yessir we're up!")
})


const startServer = async () => {
	try {
		connectDB(process.env.MONGODB_URL)
		app.listen(8080, () => { console.log("Server started on port 8080") })
	} catch (error) {
		console.log(error)
	}
}

startServer()
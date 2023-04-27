import express from "express"
import { postPrompt } from "../controllers/generate.js"

const router = express.Router()

router.route('/').post(postPrompt)

export default router
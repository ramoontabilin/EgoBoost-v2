import express from "express"
import { getComment } from "../controllers/comment.js"

const router = express.Router()

router.route('/').get(getComment)

export default router
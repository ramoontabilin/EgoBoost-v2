import express from "express"
import { getLike } from "../controllers/like.js"

const router = express.Router()

router.route('/').get(getLike)

export default router
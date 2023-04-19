import express from "express"
import { getUser } from "../controllers/user.js"

const router = express.Router()

router.route('/').get(getUser)

export default router
import express from "express"
import { login, logout, register, update } from "../controllers/auth.js"

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/update').put(update)

export default router
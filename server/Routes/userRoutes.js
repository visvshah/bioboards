import express from "express";
const router = express.Router()
import { registerUser, loginUser, getMe} from '../Controllers/userControllers.js'


router.post('/signup', registerUser)
router.post('/login', loginUser)

export default router;
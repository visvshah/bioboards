import express from "express";
const router = express.Router()
import { registerUser, loginUser, updateBoards, getBoards} from '../Controllers/userControllers.js'

router.patch("/getboards", getBoards);
router.post('/signup', registerUser)
router.post('/login', loginUser)
router.patch('/boards', updateBoards)

export default router;
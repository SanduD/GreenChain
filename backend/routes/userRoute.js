import express from 'express'
import {
  loginUser,
  registerUser,
  walletAuth,
} from '../controllers/userController.js'

const router = express.Router()
router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/wallet-auth', walletAuth)

export default router

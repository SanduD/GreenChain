import express from 'express'
import {
  loginUser,
  registerUser,
  walletAuth,
} from '../controllers/userController.js'

const router = express.Router()

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: user@example.com
 *               photo:
 *                 type: string
 *                 description: Photo URL of the user
 *                 example: http://example.com/photo.jpg
 *               fcmRegistrationToken:
 *                 type: string
 *                 description: FCM registration token
 *                 example: some_token
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 jwt:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Bad request
 */
router.post('/login', loginUser)

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: user@example.com
 *               photo:
 *                 type: string
 *                 description: Photo URL of the user
 *                 example: http://example.com/photo.jpg
 *               fcmRegistrationToken:
 *                 type: string
 *                 description: FCM registration token
 *                 example: some_token
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 jwt:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Bad request
 */
router.post('/register', registerUser)

/**
 * @swagger
 * /api/users/wallet-auth:
 *   post:
 *     summary: Authenticate user wallet
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: user@example.com
 *               walletAddress:
 *                 type: string
 *                 description: Wallet address of the user
 *                 example: 0x123456789abcdef
 *     responses:
 *       200:
 *         description: Wallet connected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: wallet connected!
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/wallet-auth', walletAuth)

export default router

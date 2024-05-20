import express from 'express'
import {
  loginUser,
  registerUser,
  walletAuth,
  addActiveDay,
  getUserWalletBalance,
  getUserTransactions,
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
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 jwt:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/wallet-auth', walletAuth)

/**
 * @swagger
 * /api/users/activeDay:
 *   post:
 *     summary: Add an active day for a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Active day added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/activeDay', addActiveDay)

/**
 * @swagger
 * /api/users/wallet-balance/{userId}:
 *   get:
 *     summary: Get wallet balance for a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Wallet balance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                   example: 1000
 *       400:
 *         description: Wallet address not provided
 *       500:
 *         description: Internal server error
 */
router.get('/wallet-balance/:userId', getUserWalletBalance)

/**
 * @swagger
 * /api/users/transactions/{userId}:
 *   get:
 *     tags: [Users]
 *     summary: Get all transactions for a user
 *     description: Retrieve all transactions for a specified user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: A list of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       blockNum:
 *                         type: string
 *                         description: Block number
 *                       hash:
 *                         type: string
 *                         description: Transaction hash
 *                       from:
 *                         type: string
 *                         description: Sender address
 *                       to:
 *                         type: string
 *                         description: Receiver address
 *                       value:
 *                         type: string
 *                         description: Value transferred
 *                       asset:
 *                         type: string
 *                         description: Asset type (e.g., ETH, ERC20)
 *                       category:
 *                         type: string
 *                         description: Transaction category
 *       500:
 *         description: Internal server error
 */
router.get('/transactions/:userId', getUserTransactions)

export default router

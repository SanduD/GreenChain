import express from 'express'
import { addBill, getUserBills } from '../controllers/billController.js'
import { upload } from '../controllers/utils.js'

const router = express.Router()

/**
 * @swagger
 * /api/bills/{userId}:
 *   get:
 *     summary: Get all bills for a user
 *     tags: [Bills]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of bills
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bill'
 *       404:
 *         description: No bills found
 *       500:
 *         description: Server error
 */
router.get('/:userId', getUserBills)

/**
 * @swagger
 * /api/bills:
 *   post:
 *     summary: Add a new bill
 *     tags: [Bills]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - type
 *               - image
 *             properties:
 *               userId:
 *                 type: string
 *               type:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Bill added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bill'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/', upload.single('image'), addBill)

export default router

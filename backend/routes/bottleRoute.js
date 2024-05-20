import express from 'express'
import {
  addScannedBottles,
  getUserBottles,
} from '../controllers/bottleController.js'

const router = express.Router()

/**
 * @swagger
 * /api/bottles:
 *   post:
 *     summary: Add a new bottle
 *     tags: [Bottles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - quantity
 *             properties:
 *               userId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Bottle added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bottle'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/', addScannedBottles)

/**
 * @swagger
 * /api/bottles/{userId}:
 *   get:
 *     summary: Get all bottles for a user
 *     tags: [Bottles]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of bottles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bottle'
 *       404:
 *         description: No bottles found
 *       500:
 *         description: Server error
 */
router.get('/:userId', getUserBottles)

export default router

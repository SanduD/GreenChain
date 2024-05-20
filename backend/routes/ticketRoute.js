import express from 'express'
import { addTicket, getUserTickets } from '../controllers/ticketController.js'
import { upload } from '../controllers/utils.js'

const router = express.Router()

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Add a new ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - image
 *             properties:
 *               userId:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Ticket added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/', upload.single('image'), addTicket)

/**
 * @swagger
 * /api/tickets/{userId}:
 *   get:
 *     summary: Get all tickets for a user
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: No tickets found
 *       500:
 *         description: Server error
 */
router.get('/:userId', getUserTickets)

export default router

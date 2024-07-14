// import express from 'express'
// import { sendNotif } from '../controllers/notificationController.js'

// const router = express.Router()

// /**
//  * @swagger
//  * /api/notifications/send:
//  *   post:
//  *     summary: Send a notification
//  *     tags: [Notifications]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - fcmToken
//  *               - title
//  *               - body
//  *             properties:
//  *               fcmToken:
//  *                 type: string
//  *               title:
//  *                 type: string
//  *               body:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Notification sent successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Notification sent successfully
//  *       400:
//  *         description: Bad request
//  *       500:
//  *         description: Server error
//  */
// router.post('/send', sendNotif)

// export default router

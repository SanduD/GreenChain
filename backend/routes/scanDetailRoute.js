import express from 'express'
import {
  saveScanDetail,
  getScanDetail,
  scanBill,
  scanTicket,
  upload,
} from '../controllers/scanDetailController.js'

const router = express.Router()

/**
 * @swagger
 * /api/scan-details:
 *   post:
 *     summary: Save scan detail
 *     tags: [ScanDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               scanType:
 *                 type: string
 *                 enum: [PET, Ticket, Bill]
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Scan detail saved successfully
 *       400:
 *         description: Bad request
 */
router.post('/', saveScanDetail)

/**
 * @swagger
 * /api/scan-details:
 *   get:
 *     summary: Get scan details by user ID
 *     tags: [ScanDetails]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Scan details fetched successfully
 *       404:
 *         description: No scan details found
 */
router.get('/', getScanDetail)

router.post('/ticket', scanTicket)

router.post('/bill', upload.single('image'), scanBill)

export default router

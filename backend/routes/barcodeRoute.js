import express from 'express'
import {
  verifyBarcode,
  getAllBarcodes,
} from '../controllers/barcodeController.js'

const router = express.Router()

/**
 * @swagger
 * /api/barcodes/verify/{barcode}:
 *   get:
 *     summary: Verify a barcode
 *     tags: [Barcodes]
 *     parameters:
 *       - in: path
 *         name: barcode
 *         schema:
 *           type: string
 *         required: true
 *         description: The barcode to verify
 *     responses:
 *       200:
 *         description: Barcode is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Barcode is invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error verifying barcode
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

router.get('/verify/:barcode', verifyBarcode)

/**
 * @swagger
 * /api/barcodes:
 *   get:
 *     summary: Get all barcodes
 *     tags: [Barcodes]
 *     responses:
 *       200:
 *         description: A list of all barcodes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   barcode:
 *                     type: string
 *                   scannedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error fetching barcodes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get('/', getAllBarcodes)

export default router

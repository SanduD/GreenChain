import express from 'express'
import {
  saveScanDetail,
  getScanDetail,
} from '../controllers/scanDetailController.js'

const router = express.Router()

//
router.get('/', getScanDetail)
router.post('/', saveScanDetail)

export default router

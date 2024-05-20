import mongoose from 'mongoose'

const barcodeSchema = new mongoose.Schema({
  barcode: {
    type: String,
    required: true,
    unique: true,
  },
  scannedAt: {
    type: Date,
    default: Date.now,
  },
})

const Barcode = mongoose.model('Barcode', barcodeSchema)

export default Barcode

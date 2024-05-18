import mongoose from 'mongoose'

const scanDetailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  scanType: {
    type: String,
    required: true,
    enum: ['Pet', 'Ticket', 'Bill'],
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  rewardGRC: {
    type: Number,
    required: true,
    min: 0,
  },
  savedAtDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
})
const ScanDetail = mongoose.model('ScanDetail', scanDetailSchema)
export default ScanDetail

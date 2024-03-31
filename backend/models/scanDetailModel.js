import mongoose from 'mongoose'

const scanDetailSchema = new mongoose.Schema({
  rewardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reward',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  scanType: {
    type: String,
    required: true,
    enum: ['PET', 'Ticket', 'Invoice'],
  },
  quantity: {
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

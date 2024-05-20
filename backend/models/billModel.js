import mongoose from 'mongoose'

const billSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: true,
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
  barcode: {
    type: String,
    default: null,
  },
  savedAtDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
})
const Bill = mongoose.model('Bill', billSchema)
export default Bill

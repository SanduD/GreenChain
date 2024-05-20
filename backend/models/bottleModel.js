import mongoose from 'mongoose'

const bottleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  savedAtDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
})
const Bottle = mongoose.model('Bottle', bottleSchema)
export default Bottle

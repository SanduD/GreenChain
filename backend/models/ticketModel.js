import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rewardGRC: {
    type: Number,
    required: true,
    min: 0,
  },
  ticketCode: {
    type: String,
    required: true,
  },
  savedAtDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
})
const Ticket = mongoose.model('Ticket', ticketSchema)
export default Ticket

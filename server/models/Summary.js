import mongoose from 'mongoose'

const summarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String, required: true },
  source: String,
  date: String,
  url: String,
  summary: { type: String, required: true },
  isPublic: { type: Boolean, default: false },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Summary', summarySchema)

import mongoose from 'mongoose'

const summarySchema = new mongoose.Schema({
  title: String,
  source: String,
  date: String,
  url: String,
  summary: String
})

export default mongoose.model('Summary', summarySchema)

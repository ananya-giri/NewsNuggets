import Summary from '../models/Summary.js'

// Save a summary
export const saveSummary = async (req, res) => {
  try {
    const summary = new Summary(req.body)
    await summary.save()
    res.status(201).json(summary)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get all summaries
export const getSummaries = async (req, res) => {
  try {
    const summaries = await Summary.find().sort({ _id: -1 })
    res.json(summaries)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

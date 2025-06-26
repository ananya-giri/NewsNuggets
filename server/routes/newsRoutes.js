import express from 'express'
import axios from 'axios'
const router = express.Router()

const NEWS_API_KEY = process.env.NEWS_API_KEY  // Add to .env

router.get('/', async (req, res) => {
  const category = req.query.category || 'general'
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        category,
        pageSize: 9,
        apiKey: NEWS_API_KEY
      }
    })
    res.json(response.data.articles)
  } catch (err) {
    console.error('❌ Error fetching news:', err.message)
    res.status(500).json({ error: 'Failed to fetch news' })
  }
})

export default router

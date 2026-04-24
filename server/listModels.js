import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()

const key = process.env.GEMINI_API_KEY
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`

async function listModels() {
  try {
    const res = await axios.get(url)
    console.log('Available Models:')
    res.data.models.forEach(m => console.log(`- ${m.name}`))
  } catch (e) {
    console.error('Error:', e.response?.data?.error?.message || e.message)
  }
}

listModels()

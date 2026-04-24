import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()

const key = process.env.GEMINI_API_KEY
const models = [
  'gemini-pro-latest',
  'gemini-1.5-pro',
  'gemini-flash-latest'
]

for (const model of models) {
  for (const version of ['v1', 'v1beta']) {
    const url = `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${key}`
    try {
      const r = await axios.post(url, {
        contents: [{ parts: [{ text: 'Say hi.' }] }]
      })
      console.log(`✅ WORKS: ${version}/${model}`)
      console.log('   Response:', r.data.candidates[0].content.parts[0].text.trim())
      process.exit(0)
    } catch (e) {
      console.log(`❌ ${version}/${model} → HTTP ${e.response?.status}: ${e.response?.data?.error?.message || e.message}`)
    }
  }
}

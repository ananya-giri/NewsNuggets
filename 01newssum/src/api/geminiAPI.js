import axios from 'axios'

// Key is read from .env (VITE_GEMINI_API_KEY) - update .env when rotating keys
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`

export const summarizeArticle = async (articleText) => {
  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [
        {
          parts: [
            {
              text: `Summarize the following news article in 3 concise bullet points:\n\n${articleText}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 300
      }
    })

    return response.data.candidates[0].content.parts[0].text
  } catch (error) {
    console.error('❌ Gemini Error:', error.response?.status, error.response?.data?.error?.message || error.message)
    return 'Failed to generate summary. Please try again later.'
  }
}

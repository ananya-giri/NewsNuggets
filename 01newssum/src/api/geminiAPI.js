import axios from 'axios'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY


const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`



export const summarizeArticle = async (articleText) => {
  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [
        {
          parts: [
            {
              text: `Summarize the following article in 3 bullet points:\n${articleText}`
            }
          ]
        }
      ]
    })
    return response.data.candidates[0].content.parts[0].text
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message)
    return "Sorry, could not generate summary."
  }
}

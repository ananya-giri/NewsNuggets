import axios from 'axios'

// Use your live backend API
const BASE_URL = 'https://newsnugget-backend.onrender.com/api/news'

export const getNewsByCategory = async (category = 'general') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { category }
    })
    return response.data
  } catch (error) {
    console.error('❌ Error fetching news:', error.response?.data || error.message)
    return []
  }
}

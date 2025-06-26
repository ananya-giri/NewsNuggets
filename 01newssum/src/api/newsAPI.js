import axios from 'axios'

// const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const BASE_URL = 'https://newsnuggets-backend.onrender.com/api/news'

export const getNewsByCategory = async (category = 'general') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        category,
        country: 'us', // 'in' sometimes returns empty
        apiKey: API_KEY,
        pageSize: 9
      },
      headers: {
        'User-Agent': 'Briefly-NewsApp/1.0'
      }
    })
    return response.data.articles
  } catch (error) {
    console.error('Error fetching news:', error.response?.data || error.message)
    return []
  }
}

import axios from 'axios'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY

const BASE_URL = 'https://newsapi.org/v2/top-headlines'

export const getNewsByCategory = async (category = 'general') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        category,
        country: 'us', // India
        apiKey: API_KEY,
        pageSize: 9
      }
    })
    return response.data.articles
  } catch (error) {
    console.error('Error fetching news:', error)

    console.log('NewsAPI response:', response.data)

    return []
  }
}

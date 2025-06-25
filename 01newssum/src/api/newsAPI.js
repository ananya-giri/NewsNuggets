import axios from 'axios'

const API_KEY ='2159c461c5b24be297796ec21af32e7a'
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

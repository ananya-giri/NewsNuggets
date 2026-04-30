import axios from 'axios'

// ✅ Local backend API URL (change to production URL when deploying)
const BASE_URL = 'https://newsnuggets-b.onrender.com/api/news'

export const getNewsByCategory = async (category = 'general') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { category } // ✅ Only send category
    })
    return response.data  // Your backend already returns article list
  } catch (error) {
    console.error('❌ Error fetching news:', error.response?.data || error.message)
    return []
  }
}

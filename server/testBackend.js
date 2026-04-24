import axios from 'axios'

async function testBackendGenerate() {
  try {
    const res = await axios.post('http://127.0.0.1:5001/api/summaries/generate', {
      text: 'Test news article content.'
    })
    console.log('✅ Success:', res.data)
  } catch (e) {
    console.error('❌ Failed:', e.response?.status, e.response?.data || e.message)
  }
}

testBackendGenerate()

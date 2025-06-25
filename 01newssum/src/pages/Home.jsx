import { useEffect, useState } from 'react'
import ArticleCard from '../components/ArticleCard'
import Tabs from '../components/Tabs'
import { getNewsByCategory } from '../api/newsAPI'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [category, setCategory] = useState('general')
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   const fetchNews = async () => {
  //     setLoading(true)
  //     const data = await getNewsByCategory(category)
  //     setArticles(data)
  //     setLoading(false)
  //   }

  //   fetchNews()
  // }, [category])

  useEffect(() => {
  const fetchNews = async () => {
    console.log("Fetching news for:", category)
    const data = await getNewsByCategory(category)
    console.log("Received articles:", data)
    setArticles(data)
  }
  fetchNews()
}, [category])

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Tabs setCategory={setCategory} current={category} />
      {loading ? (
        <p className="text-center mt-10">Loading news...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {articles.map((article, i) => (
            <ArticleCard key={i} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
// useEffect(() => {
//   const fetchNews = async () => {
//     console.log("Fetching news for:", category)
//     const data = await getNewsByCategory(category)
//     console.log("Received articles:", data)
//     setArticles(data)
//   }
//   fetchNews()
// }, [category])


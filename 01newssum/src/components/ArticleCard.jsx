import { useNavigate } from 'react-router-dom'

export default function ArticleCard({ article }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/article', { state: { article } }) // passing article as route state
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg p-4 cursor-pointer transition"
      onClick={handleClick}
    >
      <img
        src={article.urlToImage || 'https://via.placeholder.com/300x150'}
        alt="thumbnail"
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="mt-2 text-lg font-semibold">{article.title}</h2>
      <p className="text-sm text-gray-500 mb-2">
        Source: {article.source.name || 'Unknown'}
      </p>

      {/* ✅ Button now navigates to ArticleDetail page too */}
      <button
        className="mt-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={(e) => {
          e.stopPropagation() // prevent triggering parent card click
          navigate('/article', { state: { article } })
        }}
      >
        Summarise
      </button>
    </div>
  )
}

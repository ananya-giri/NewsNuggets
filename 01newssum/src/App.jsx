import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MySummaries from './pages/MySummaries'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ArticleDetail from './components/ArticleDetail'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summaries" element={<MySummaries />} />
        <Route path="/article" element={<ArticleDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

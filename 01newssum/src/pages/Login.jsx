import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const result = await login(email, password)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[85vh] px-4 animate-fade-in">
      <div className="w-full max-w-md p-10 space-y-8 glass-card rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-secondary/20 rounded-full blur-3xl"></div>

        <div className="text-center relative z-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
            <span className="text-white font-black text-3xl">N</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-slate-400 font-medium">Continue your news journey</p>
        </div>
        
        {error && (
          <div className="p-4 text-sm text-red-400 bg-red-400/10 rounded-2xl border border-red-400/20 animate-fade-in text-center">
            {error}
          </div>
        )}

        <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all text-white placeholder-slate-600"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all text-white placeholder-slate-600"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 text-white bg-brand-primary rounded-2xl hover:bg-brand-secondary transition-all font-bold shadow-xl shadow-brand-primary/20 tracking-wide uppercase text-sm"
          >
            Sign In
          </button>
        </form>

        <div className="text-center relative z-10">
          <p className="text-sm text-slate-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-brand-primary hover:text-brand-secondary transition-colors">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

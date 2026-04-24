import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { apiRequest } from '../api.js'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await apiRequest('/login', 'POST', form)
      localStorage.setItem('token', data.token)
      navigate('/welcome')
    } catch (err) {
      alert(err.message)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="scene">
        <div className="sun">
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffdb00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" fill="#ffdb00" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="6.34" x2="19.78" y2="4.22" />
          </svg>
        </div>
        <div className="cloud"></div>
        <div className="hills">
          <div className="hill hill-1"></div>
          <div className="hill hill-2"></div>
          <div className="hill hill-3"></div>
        </div>
      </div>

      <div className="app-container">
        <div className="auth-card">
          <div className="logo-container">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00d95f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.9-2.1-4-3.8c-.1 1.7-2 2.2-4 3.8s-3 3.5-3 5.5a7 7 0 0 0 7 7z" />
                <path d="M12 10V5" />
                <circle cx="12" cy="5" r="2" />
              </svg>
            </div>
            <h1 className="logo-text">Seedling</h1>
            <p className="subtitle">Plant your thoughts, grow a garden</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              Welcome Back <span>→</span>
            </button>
          </form>

          <div className="footer-link">
            New to the garden?
            <Link to="/register">Plant your first seed</Link>
          </div>
        </div>
      </div>
    </>
  )
}
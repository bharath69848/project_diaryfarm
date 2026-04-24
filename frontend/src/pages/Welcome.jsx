import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../api.js'

export default function Welcome() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiRequest('/profile')
        setUser(data)
      } catch {
        localStorage.removeItem('token')
        navigate('/login')
      }
    }

    fetchProfile()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
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
        <div className="auth-card" style={{ maxWidth: '600px' }}>
          <div className="logo-container">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00d95f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.9-2.1-4-3.8c-.1 1.7-2 2.2-4 3.8s-3 3.5-3 5.5a7 7 0 0 0 7 7z" />
                <path d="M12 10V5" />
                <circle cx="12" cy="5" r="2" />
              </svg>
            </div>
            <h1 className="logo-text">Hello, {user ? user.username : 'Gardener'}!</h1>
            <p className="subtitle">Your secret garden is growing beautifully</p>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'var(--input-bg)', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
              <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>Ready to plant a new thought?</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                Every word you write is a seed for your future self.
              </p>
              <button className="btn-primary" style={{ width: '100%' }}>
                Write New Entry <span>+</span>
              </button>
            </div>

            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                textDecoration: 'underline'
              }}
            >
              Take a break (Logout)
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

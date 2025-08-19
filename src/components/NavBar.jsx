import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function NavBar({ openLoginModal }) {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link>
      {!isLoggedIn && (
        <button onClick={openLoginModal} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
          Log In
        </button>
      )}
      {isLoggedIn && (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
            Log Out
          </button>
        </>
      )}
    </nav>
  )
}

export default NavBar
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaHome } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";


function NavBar({ openLoginModal }) {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <div className='nav-item'><Link to="/"><FaHome /></Link></div>
      {!isLoggedIn && (
        <div className='nav-item' id='login-button' onClick={openLoginModal}>
            Log In
        </div>
      )}
      {isLoggedIn && (
        <>
          <div className='nav-item'><Link to="/profile"><IoPersonCircle /></Link></div>
          <div className='nav-item' id='logout-button' onClick={handleLogout}>
              Log Out
          </div>
        </>
      )}
    </nav>
  )
}

export default NavBar
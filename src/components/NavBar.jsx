import { NavLink, useNavigate } from 'react-router-dom'
import { FiUser, FiShoppingCart, FiLogIn } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
//import logo from '../../public/logo.png' // e.g. /src/assets/logo.png
import '../style/NavBar.css'

function NavBar({ openLoginModal }) {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const goProfile = () => (isLoggedIn ? navigate('/profile') : openLoginModal())
  const goCart = () => navigate('/cart')
  const openLogin = () => openLoginModal()

  return (
    <nav className="nav">
      {/* Left: Logo */}
      <div className="nav__left" onClick={() => navigate('/')} role="button" aria-label="Home">
        <img src="/logo.png" alt="Home" className="nav__logo" />
      </div>

      {/* Center: Menu */}
      <div className="nav__center">
        <NavLink end to="/" className="nav__link">All</NavLink>
        <NavLink to="/women" className="nav__link">Women&apos;s</NavLink>
        <NavLink to="/men" className="nav__link">Men&apos;s</NavLink>
        <NavLink to="/jewelry" className="nav__link">Jewelry</NavLink>
        <NavLink to="/electronics" className="nav__link">Electronics</NavLink>
      </div>

      {/* Right: Icons */}
      <div className="nav__right">
        <button className="icon-btn" onClick={goProfile} aria-label="Profile">
          <FiUser />
        </button>
        <button className="icon-btn" onClick={goCart} aria-label="Cart">
          <FiShoppingCart />
        </button>
        {!isLoggedIn && (
          <button className="icon-btn" onClick={openLogin} aria-label="Log In">
            <FiLogIn />
          </button>
        )}
      </div>
    </nav>
  )
}

export default NavBar

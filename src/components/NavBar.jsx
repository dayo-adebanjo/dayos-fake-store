import { Link, useLocation, useNavigate} from 'react-router-dom'
import { FiUser, FiShoppingCart, FiLogIn, FiSearch } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import '../style/NavBar.css'


const categoryFromSearch = (search) => {
  const sp = new URLSearchParams(search)
  return (sp.get('category') || '').toLowerCase()
}

export default function NavBar({ openLoginModal, toggleSearch }) {
  const { isLoggedIn, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const activeCat = categoryFromSearch(location.search)

  const isActive = (slug) => {
    if (slug === 'all') return location.pathname === '/products' && !activeCat
    return location.pathname === '/products' && activeCat === slug
  }

  return (
    <nav className="nav">
      {/* Left: Logo */}
      <div className="nav__left">
        <Link to="/" aria-label="Home">
          <img src='/logo.png' alt="Fake" className="nav__logo" />
        </Link>
      </div>

      {/* Center: Query-based category links */}
      <div className="nav__center">
        <Link to="/products" className={`nav__link ${isActive('all') ? 'active' : ''}`}>All</Link>
        <Link to="/products?category=women" className={`nav__link ${isActive('women') ? 'active' : ''}`}>Women’s</Link>
        <Link to="/products?category=men" className={`nav__link ${isActive('men') ? 'active' : ''}`}>Men’s</Link>
        <Link to="/products?category=jewelry" className={`nav__link ${isActive('jewelry') ? 'active' : ''}`}>Jewelry</Link>
        <Link to="/products?category=electronics" className={`nav__link ${isActive('electronics') ? 'active' : ''}`}>Electronics</Link>
      </div>

      {/* Right: Icons */}
      <div className="nav__right">
        <button className="icon-btn" onClick={toggleSearch} aria-label="Search">
            <FiSearch />
        </button>
        
        <button className="icon-btn" onClick={() => (isLoggedIn ? 
          navigate('/profile') : openLoginModal())} aria-label="Log In / Profile">
          {isLoggedIn ? <FiUser /> : <FiLogIn />}
        </button>

        <Link alt="Cart" to="/cart" className="icon-btn" aria-label="Cart">
          <FiShoppingCart />
        </Link>
        
        {isLoggedIn && (
          <button alt="Log Out"  className="icon-btn" onClick={logout} aria-label="Log Out">
            <span style={{ fontSize: 12, fontWeight: 700 }}>⎋</span>
          </button>
        )}
      </div>
    </nav>
  )
}

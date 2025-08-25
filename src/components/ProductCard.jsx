import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import LoginModal from './LoginModal'


function ProductCard({ product }) {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(false)

  const handleBuy = () => {
    if (isLoggedIn) {
      navigate('/order-confirmation', { state: { title: product.title } })
    } else {
      setShowLogin(true)
    }
  }
  return (
    <>
    <div className="product-card">
        <div className="product-image" onClick={() => navigate(`/products/${product.id}`, { state: { product } })}>
          <img className="prod-img" src={product.image} alt={product.title}/>
        </div>
      <div className="product-metadata">
        <div className="product-title"><h3>{product.title}</h3></div>
        <div className="product-price"><p>${product.price.toFixed(2)}</p></div>
        <div className="product-rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`star ${i < Math.round(product.rating?.rate || 0) ? "on" : ""}`}
            >★</span>
          ))}
          <span className="product-rating-text rel-card__rating-text">
            {(product.rating?.rate || 0).toFixed(1)}/5 ({product.rating.count} Reviews)
          </span>
        </div>
      </div>
      <div className="product-add-to-cart">
        <button className="orange-btn" onClick={handleBuy}>Buy</button>
      </div>
    </div>
    {showLogin && (
        <LoginModal
          isOpen={showLogin}
          onRequestClose={() => setShowLogin(false)}
          productTitle={product.title}
        />
      )}
    </>
  )
}

export default ProductCard
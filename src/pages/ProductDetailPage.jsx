import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useMemo, useEffect } from 'react'
import { FiMinus, FiPlus, FiHeart } from "react-icons/fi"
import LoginModal from '../components/LoginModal'
import "../style/ProductDetailPage.css"

function ProductDetailPage() {
  const { state } = useLocation()
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(false)
  const [qty, setQty] = useState(1)

  const [related, setRelated] = useState([])
  const [relLoading, setRelLoading] = useState(false)
  useEffect(() => {
    if (!state?.product.category) return
    setRelLoading(true)
    fetch(
      `https://fakestoreapi.com/products`
    )
      .then((r) => r.json())
      .then((items) => {
        // exclude current product, pick first 4
        const list = items.filter(
          (p) => p.id !== state?.product.id && p.category=== state?.product.category).slice(0, 4)
        setRelated(list)
        setRelLoading(false)
      })
      .catch(() => setRelLoading(false))
  }, [state?.product])


  const handleBuy = () => {
    if (isLoggedIn) {
      navigate('/order-confirmation', { state: { title: state?.product.title } })
    } else {
      setShowLogin(true)
    }
  }

  const rating = useMemo(() => {
    const r = state?.product.rating?.rate ?? 0
    const c = state?.product.rating?.count ?? 0
    return { rate: r, count: c }
  }, [state?.product])

  const decrement = () => setQty((q) => Math.max(1, q - 1))
  const increment = () => setQty((q) => Math.min(99, q + 1))

  return (
    <div className="pdp">
      <div className="pdp-wrap">
      <div className="pdp-grid">
        {/* LEFT: Single Image */}
        <div className="pdp-hero">
          <img src={state?.product.image} alt={state?.product.title} />
        </div>

        {/* RIGHT: Details */}
        <div className="pdp-details">
          <div className="pdp-title-row">
            <h1 className="pdp-title">{state?.product.title}</h1>
            <span className="pdp-badge">In Stock</span>
          </div>

          <div className="pdp-rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`star ${i < Math.round(rating.rate) ? "on" : ""}`}
              >
                ★
              </span>
            ))}
            <span className="rating-text">
              {rating.rate.toFixed(1)} ({rating.count} Review)
            </span>
          </div>

          <div className="pdp-prices">
            <span className="now">${state?.product.price.toFixed(2)}</span>
          </div>

          <p className="pdp-desc">{state?.product.description}</p>

          {/* Actions */}
          <div className="pdp-actions">
            <div className="qty">
              <button onClick={decrement} aria-label="decrease">
                <FiMinus />
              </button>
              <span>{qty}</span>
              <button onClick={increment} aria-label="increase">
                <FiPlus />
              </button>
            </div>

            <button className="btn add">
              Add To Cart
            </button>
            <button className="btn buy" onClick={handleBuy}>
              Buy Now
            </button>

            <button className="wish" aria-label="wishlist">
              <FiHeart />
            </button>
          </div>

          {/* Meta */}
          <div className="pdp-meta"> 
            <div>
              <span className="meta-label">Tags: {state?.product.category} </span> 
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="related">
        <h4 className="related__title">You might also like</h4>

        {relLoading ? (
          <div className="related__loading">Loading suggestions…</div>
        ) : (
          <div className="related__grid">
            {related.map((item) => (
              <div onClick={() => navigate(`/products/${state?.product.id}`, { state: { product: state.product } })} 
              className="rel-card">
                <div className="rel-card__image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="rel-card__body">
                  <h3 className="rel-card__title">{item.title}</h3>
                  <div className="rel-card__rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`star ${i < Math.round(item.rating?.rate || 0) ? "on" : ""}`}
                      >★</span>
                    ))}
                    <span className="rel-card__rating-text">
                      {(item.rating?.rate || 0).toFixed(1)}/5
                    </span>
                  </div>
                  <div className="rel-card__price">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
  
      {showLogin && (
        <LoginModal
          isOpen={showLogin}
          onRequestClose={() => setShowLogin(false)}
          productTitle={state?.product.title}
        />
      )}
    </div>
  )
}

export default ProductDetailPage

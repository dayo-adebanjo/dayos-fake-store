import Modal from 'react-modal'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoginModal from './LoginModal'

function ProductModal({ product, isOpen, onRequestClose }) {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (product) {
      setLoading(true)
      const timeout = setTimeout(() => setLoading(false), 500) // simulate image load
      return () => clearTimeout(timeout)
    }
  }, [product])

  const handleBuy = () => {
    if (isLoggedIn) {
      navigate('/order-confirmed', { state: { title: product.title } })
    } else {
      setShowLogin(true)
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Product Details"
        style={{ content: { maxWidth: '500px', margin: 'auto' } }}
      >
        {loading ? (
          <div style={{ textAlign: 'center' }}>Loading product...</div>
        ) : (
          <>
            <img src={product.image} alt={product.title} style={{ maxHeight: '200px' }} />
            <h2>{product.title}</h2>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)</p>
            <button onClick={handleBuy}>Buy</button>
            <button onClick={onRequestClose}>Close</button>
          </>
        )}
      </Modal>

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

export default ProductModal

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
      navigate('/order-confirmation', { state: { title: product.title } })
    } else {
      setShowLogin(true)
    }
  }

  return (
    <>
      <Modal
        id='product-modal'
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Product Details"
        style={{ content: { maxWidth: '500px', margin: 'auto' } }}
      >
        {loading ? (
          <div style={{ textAlign: 'center', fontSize: '12px', height:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Loading...
          </div>
        ) : (
          <div style={{fontFamily: 'Georgia'}}>
            <div className="modal-product-image" style={{ backgroundColor: '#fff'}}>
              <img src={product.image} alt={product.title} style={{ width: '90%' }} />
            </div>
            <h2 style={{fontSize: 20}}>{product.title}</h2>
            <p style={{fontSize: 16}}><strong> ${product.price}</strong></p>
            <p style={{fontSize: 14, width: '80%', margin: 'auto'}}>{product.description}</p>
            <p style={{fontSize: 12, paddingTop: 30, textTransform: "capitalize"}}> <b>{product.category}</b></p>
            <p>{product.rating.rate} ({product.rating.count} reviews)</p>
            <div className="buy-button" style={{margin: 'auto', marginTop: 30}} onClick={handleBuy}>
              Buy
            </div>
          </div>
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

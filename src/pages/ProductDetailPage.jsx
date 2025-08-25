import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import LoginModal from '../components/LoginModal'

function ProductDetailPage() {
  const { state } = useLocation()
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(false)

  const handleBuy = () => {
    if (isLoggedIn) {
      navigate('/order-confirmation', { state: { title: state?.product.title } })
    } else {
      setShowLogin(true)
    }
  }

  return (
    <>
      <div style={{fontFamily: 'Georgia'}}>
        <div className="modal-product-image" style={{ backgroundColor: '#fff'}}>
          <img src={state?.product.image} alt={state?.product.title} style={{ width: '90%' }} />
        </div>
        <h2 style={{fontSize: 20}}>{state?.product.title}</h2>
        <p style={{fontSize: 16}}><strong> ${state?.product.price}</strong></p>
        <p style={{fontSize: 14, width: '80%', margin: 'auto'}}>{state?.product.description}</p>
        <p style={{fontSize: 12, paddingTop: 30, textTransform: "capitalize"}}> <b>{state?.product.category}</b></p>
        <p>{state?.product.rating.rate} ({state?.product.rating.count} reviews)</p>
        <div className="buy-button" style={{margin: 'auto', marginTop: 30}} onClick={handleBuy}>
          Buy
        </div>
      </div>
      {showLogin && (
        <LoginModal
          isOpen={showLogin}
          onRequestClose={() => setShowLogin(false)}
          productTitle={state?.product.title}
        />
      )}
    </>
  )
}

export default ProductDetailPage

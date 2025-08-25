import { useLocation, useNavigate } from 'react-router-dom'

function OrderConfirmation() {
  const { state } = useLocation()
  const navigate = useNavigate()

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Congrats!</h2>
      <div>Order for <b>{state?.title}</b> Confirmed 🎉</div>
      <div className="orange-btn return-button" onClick={() => navigate('/')}>
        Continue Shopping</div>
    </div>
  )
}

export default OrderConfirmation
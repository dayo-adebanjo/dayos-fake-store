import { useLocation, useNavigate } from 'react-router-dom'

function OrderConfirmation() {
  const { state } = useLocation()
  const navigate = useNavigate()

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Congrats! Order for <em>{state?.title}</em> Confirmed 🎉</h2>
      <button onClick={() => navigate('/')}>Continue Shopping</button>
    </div>
  )
}

export default OrderConfirmation
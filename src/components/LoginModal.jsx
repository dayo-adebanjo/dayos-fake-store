import Modal from 'react-modal'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function LoginModal({ isOpen, onRequestClose, productTitle }) {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      login()
      setLoading(false)
      onRequestClose()
      navigate('/order-confirmed', { state: { title: productTitle } })
    }, 1000)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login"
      style={{ content: { maxWidth: '400px', margin: 'auto' } }}
    >
      {loading ? (
        <div style={{ textAlign: 'center' }}>Logging in...</div>
      ) : (
        <>
          <h2>Log In</h2>
          <p>This is a simulated login modal.</p>
          <button onClick={handleLogin}>Log In</button>
          <button onClick={onRequestClose}>Cancel</button>
        </>
      )}
    </Modal>
  )
}

export default LoginModal

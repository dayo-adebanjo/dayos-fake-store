import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function LoginModal({ isOpen, onRequestClose, productTitle }) {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch users on modal open
  useEffect(() => {
    if (isOpen) {
      fetch('https://fakestoreapi.com/users')
        .then(res => res.json())
        .then(data => setUsers(data))
    }
  }, [isOpen])

  const handleLogin = () => {
    setLoading(true)
    setError('')

    const matchedUser = users.find(
      (u) =>
        u.email === email.trim() &&
        u.password === password
    )

    setTimeout(() => {
      setLoading(false)
      if (matchedUser) {
        login(matchedUser)
        onRequestClose()
        if (productTitle) {
          navigate('/order-confirmation', { state: { title: productTitle } })
        }
      } else {
        setError('Invalid credentials. Please try again.')
      }
    }, 1000)
  }

  return (
    <Modal
      id="login-modal"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login"
      style={{ content: { maxWidth: '400px', margin: 'auto' } }}
    >
      {loading ? (
        <div style={{ textAlign: 'center', fontSize: '12px', height:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Logging in...
          </div>
      ) : (
        <>
          <h2>Log In</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleLogin}>Log In</button>
            <button onClick={onRequestClose}>Cancel</button>
          </div>
        </>
      )}
    </Modal>
  )
}

export default LoginModal

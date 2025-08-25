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
          <div className="login-entry">
            <input
              className='login-input'
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className='login-input'
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30}}>
              <button style={{ width: 100}} className="orange-btn" onClick={handleLogin}>Log In</button>
              <button style={{ width: 100}} className="grey-btn" onClick={onRequestClose}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </Modal>
  )
}

export default LoginModal

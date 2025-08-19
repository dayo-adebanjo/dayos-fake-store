import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    login()
    navigate('/profile')
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Log In</h2>
      <button onClick={handleLogin}>Simulate Login</button>
    </div>
  )
}

export default LoginPage
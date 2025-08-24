import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome</h1>
      <p>This is a simple landing page.</p>
      <Link to="/products">Go to Products</Link>
    </div>
  )
}
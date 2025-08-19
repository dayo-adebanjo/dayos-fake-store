import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function ProfilePage() {
  const { user, isLoggedIn } = useAuth()

  if (!isLoggedIn || !user) return <Navigate to="/" />

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Profile</h2>
      <p><strong>First Name:</strong> {user.name.firstname}</p>
      <p><strong>Last Name:</strong> {user.name.lastname}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Address:</strong> {user.address.number} {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
    </div>
  )
}

export default ProfilePage

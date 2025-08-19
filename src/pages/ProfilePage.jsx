import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function ProfilePage() {
  const { user, isLoggedIn } = useAuth()

  if (!isLoggedIn || !user) return <Navigate to="/" />

  return (
    <div className="profile-body" style={{ padding: '2rem', textAlign: 'center' }}>
      <img
        src="/avatar.png"
        alt="User avatar"
        style={{ width: '225px', height: '225px', borderRadius: '50%', marginBottom: '1rem' }}
      />
      <p style={{textTransform: 'capitalize', fontSize: '25px', margin: 0}}>
        <b>{user.name.firstname} {user.name.lastname}</b>
        </p>
      <div style={{fontSize: '12px'}}>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.address.number} {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
      </div>
      </div>
  )
}

export default ProfilePage

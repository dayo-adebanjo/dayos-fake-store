import './App.css';
import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NavBar from './components/NavBar';
import OrderConfirmation from './pages/OrderConfirmationPage';
import LoginModal from './components/LoginModal'


function App() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const routes = useRoutes([
    { path: '/', element: <HomePage /> },
    { path: '/profile', element: <ProfilePage /> },
    { path: '/order-confirmation', element: <OrderConfirmation /> }
  ])

  return (
    <>
      <NavBar openLoginModal={() => setShowLoginModal(true)} />
      {routes}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onRequestClose={() => setShowLoginModal(false)}
        />
      )}
    </>
  )
}


export default App;

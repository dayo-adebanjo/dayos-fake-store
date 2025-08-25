import './App.css';
import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import OrderConfirmation from './pages/OrderConfirmationPage';
import LoginModal from './components/LoginModal'


function App() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [products, setProducts] = useState([])


  useEffect(() => {
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
          setProducts(data)
    })
    }, []); 

  const routes = useRoutes([
    { path: '/', element: <HomePage products={products}/> },
    { path: '/products', element: <ProductsPage showSearch={showSearch} products={products}/> },
    { path: '/profile', element: <ProfilePage /> },
    { path: '/order-confirmation', element: <OrderConfirmation /> }, 
    //{ path: '/cart', element: <CartPage /> }
  ])

  
  return (
    <>
      <NavBar 
        openLoginModal={() => setShowLoginModal(true)} 
        toggleSearch={() => setShowSearch(prev => !prev)} 
      />
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

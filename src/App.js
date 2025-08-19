import './App.css';
import { useRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import NavBar from './components/NavBar';
import OrderConfirmation from './pages/OrderConfirmationPage';

function App() {
  const routes = useRoutes([
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/profile', element: <ProfilePage /> },
    { path: '/order-confirmed', element: <OrderConfirmation /> }
  ])

  return (
    <>
      <NavBar />
      {routes}
    </>
  )
}


export default App;

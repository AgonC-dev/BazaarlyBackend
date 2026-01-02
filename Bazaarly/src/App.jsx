import { createBrowserRouter, redirectDocument, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Root.jsx';
import GuestRoute from './components/GuestRoute.jsx';
import Home from './pages/Home.jsx';
import LogIn from './pages/LogIn/LogIn.jsx';
import Contact from './pages/Contact/Contact.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import SectionProduct from './pages/Products/SectionProduct.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Profile from './pages/Profile/Profile.jsx';
import ProductDetail from './pages/ProductsDetail/ProductsDetail.jsx';
import About from './pages/About/About.jsx';
import Terms from './pages/Terms/Terms.jsx';
import ProtectedRoute from './components/ProtecteRoute.jsx';


const router = createBrowserRouter([

{
  path: '/',
  element: <RootLayout />,
  children: [
    {
      index:true,
      element: <Home />
    },
    {
      path: 'login',
      element: (
        <GuestRoute>
          <LogIn />
        </GuestRoute>
  )
    },
    {
      path: 'signup',
      element: (
        <GuestRoute>
          <SignUp />
        </GuestRoute>
  )
    },
    {
      path: 'products',
      element: <SectionProduct />
    },
    {
      path:'cart',
      element: <Cart />
    },
    {
      path: 'profile',
      element: (
         <ProtectedRoute redirectTo='/'>
           <Profile />
         </ProtectedRoute>
      ) 
    },
    {
      path: 'products/:productId',
      element: <ProductDetail />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/contact',
      element: <Contact />
    },
    {
      path: '/terms',
      element: <Terms />
    }  
  ]
}

])





const MAINTENANCE = false;




function App() {
   if (MAINTENANCE) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'radial-gradient(circle at top, #0f172a, #020617)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, system-ui, sans-serif',
          color: '#e5e7eb',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            padding: '3rem 4rem',
            borderRadius: '16px',
            background: 'rgba(15, 23, 42, 0.85)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h1
            style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              color: '#3b82f6',
              letterSpacing: '1px',
            }}
          >
            Bazaarly
          </h1>

          <p
            style={{
              fontSize: '1.1rem',
              marginBottom: '0.5rem',
              opacity: 0.9,
            }}
          >
            We’re working on something awesome.
          </p>

          <span
            style={{
              fontSize: '0.9rem',
              opacity: 0.7,
            }}
          >
            Coming Soon 🚀
          </span>
        </div>
      </div>
    )
  }
  return <RouterProvider router={router} />
}

export default App

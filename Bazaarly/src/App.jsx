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
import Maintenance from './components/Maintenance/Maintenance.jsx';
import ErrorPage from './components/Error/Error.jsx';


const router = createBrowserRouter([

{
  path: '/',
  element: <RootLayout />,
  errorElement: <ErrorPage />,
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
  if(MAINTENANCE) {
   return   <Maintenance />
  }

  return <RouterProvider router={router} />
}

export default App

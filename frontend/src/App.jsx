import React from 'react'
import Home from './pages/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductDetails from './pages/ProductDetails.jsx'
import Products from './pages/Products.jsx'
import Register from './user/Register.jsx'
import Login from './user/Login.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadUser } from './features/user/userSlice.js'
import UserDashboard from './user/UserDashboard.jsx'
import ProtectRoute from './components/ProtectRoute.jsx'
import Profile from './user/Profile.jsx'
import UpdateProfile from './user/UpdateProfile.jsx'
import UpdatePassword from './user/UpdatePassword.jsx'
import ForgotPassword from './user/ForgotPassword.jsx'
import ResetPassword from './user/ResetPassword.jsx'
import Cart from './Cart/Cart.jsx'
import Shipping from './Cart/Shipping.jsx'
import OrderConfirm from './Cart/OrderConfirm.jsx'
import Payment from './Cart/Payment.jsx'
import PaymentSuccess from './Cart/PaymentSuccess.jsx'
import MyOrders from './Orders/MyOrders.jsx'
import OrderDetails from './Orders/OrderDetails.jsx'
import Dashboard from './Admin/Dashboard.jsx'
import ProductList from './Admin/ProductList.jsx'
import CreateProduct from './Admin/CreateProduct.jsx'
import UpdateProduct from './Admin/UpdateProduct.jsx'
import UsersList from './Admin/UsersList.jsx'
import UpdateRole from './Admin/UpdateRole.jsx'
import OrderList from './Admin/OrderList.jsx'
import UpdateOrder from './Admin/UpdateOrder.jsx'
import ReviewList from './Admin/ReviewList.jsx'

function App() {
  const {isAuthenticated,user} =useSelector((state)=>state.user)
  const dispatch =useDispatch()
  useEffect(()=>{
    if(isAuthenticated){
     dispatch(loadUser())
    }
  },[dispatch,isAuthenticated])
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/product/:id' element={<ProductDetails />} />
      <Route path='/products' element={<Products />} />
      <Route path='/products/:keyword' element={<Products />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<ProtectRoute element={<Profile />} />} />
      <Route path='/profile/update' element={<ProtectRoute element={< UpdateProfile />} />} />
      <Route path='/password/update' element={<ProtectRoute element={< UpdatePassword />} />} />
      <Route path='/reset/forgot' element={<ForgotPassword />} />
      <Route path='/reset/:token' element={<ResetPassword />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/shipping' element={<ProtectRoute element={< Shipping />} />} />
      <Route path='/order/confirm' element={<ProtectRoute element={< OrderConfirm />} />} />
      <Route path='/process/payment' element={<ProtectRoute element={< Payment/>} />} />
      <Route path='/paymentSuccess' element={<ProtectRoute element={< PaymentSuccess/>} />} />
      <Route path='/orders/user' element={<ProtectRoute element={< MyOrders />} />} />
      <Route path='/order/:id' element={<ProtectRoute element={< OrderDetails />} />} />
       
        {/*admin Routes*/}   
       <Route path='/admin/dashboard' element={<ProtectRoute element={< Dashboard/>} adminOnly={true} />} />
        <Route path='/admin/products' element={<ProtectRoute element={< ProductList/>} adminOnly={true} />} />
        <Route path='/admin/product/create' element={<ProtectRoute element={< CreateProduct/>} adminOnly={true} />} />
         <Route path='/admin/product/:productId' element={<ProtectRoute element={< UpdateProduct/>} adminOnly={true} />} />
         <Route path='/admin/users' element={<ProtectRoute element={< UsersList/>} adminOnly={true} />} />
    <Route path='/admin/user/:userId' element={<ProtectRoute element={< UpdateRole/>} adminOnly={true} />} />
     <Route path='/admin/orders' element={<ProtectRoute element={< OrderList/>} adminOnly={true} />} />
     <Route path='/admin/order/:orderId' element={<ProtectRoute element={< UpdateOrder/>} adminOnly={true} />} />
     <Route path='/admin/reviews' element={<ProtectRoute element={<ReviewList/>} adminOnly={true} />} />
    </Routes>
{isAuthenticated && <UserDashboard user={user}  />}
    </BrowserRouter>
  )
}

export default App
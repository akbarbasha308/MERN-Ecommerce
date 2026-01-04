import React,{useState} from 'react'
import '../CartStyles/shipping.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer'
import CheckOutPath from './checkOutPath'
import { useDispatch,useSelector } from 'react-redux'
import {Country,State,City} from 'country-state-city'
import { saveShippingInfo } from '../features/cart/cartSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Shipping() {
  const {shippingInfo} =useSelector(state=>state.cart)
  const[address,setAddress]=useState(shippingInfo.address || '')
  const [pinCode,setPincode]=useState(shippingInfo.pinCode || '')
  const[phoneNumber,setPhoneNumber]=useState(shippingInfo.phoneNumber || "")
  const[country,setCountry]=useState(shippingInfo.country || '')
  const[state,setState]=useState(shippingInfo.state || '')
  const [city ,setCity]=useState(shippingInfo.city || '')
  const navigate=useNavigate()
  const dispatch =useDispatch()
const shippingInfoSubmit=(e)=>{
  e.preventDefault()
  if(phoneNumber.length!==10)
  {
    toast.error('phone number should be 10 digit ',{position:'top-center',autoClose:3000})
    return
  }
  dispatch(saveShippingInfo({address,pinCode,phoneNumber,country,state,city}))
  navigate('/order/confirm')
}

  return (
    <>
    <PageTitle title='Shipping Info' />
    <Navbar />
    <CheckOutPath activePath={0} />
    <div className="shipping-form-container">
    <h1 className="shipping-form-header">Shipping Details</h1>
    <form action="" className="shipping-form" onSubmit={shippingInfoSubmit}>
      <div className="shipping-section">
        <div className="shipping-form-group">
      <label htmlFor='address'>Address:</label>
      <input type='text' id='address' name='address' placeholder='Enter your address' value={address}
      onChange={(e)=>setAddress(e.target.value)} />
        </div>
         <div className="shipping-form-group">
      <label htmlFor='pincode'>Pincode:</label>
      <input type='number' id='pincode' name='pincode' placeholder='Enter your pincode' value={pinCode}
      onChange={(e)=>setPincode(e.target.value)} />
        </div>
         <div className="shipping-form-group">
      <label htmlFor='phonenumber'>PhoneNumber:</label>
      <input type='tel' id='phonenumber' name='phonenumber' placeholder='Enter your phonenumber' value={phoneNumber}
      onChange={(e)=>setPhoneNumber(e.target.value)} />
        </div>
      </div>
      <div className="shipping-section">
        <div className="shipping-form-group">
          <label htmlFor='country' >Country:</label>
     <select name='country' id='country' value={country} onChange={(e)=>{setCountry(e.target.value)
                                                                         setState('')
                                                                         setCity('')
                                                                         }} >
             <option   value=''>Select your country</option>
             {Country && Country.getAllCountries().map(item=>
              (<option value={item.isoCode} key={item.isoCode}>{item.name}</option>)  )}                                                             
              </select>
        </div>
    {country &&   <div className="shipping-form-group">
        <label htmlFor='state' >State</label>
        <select name='state' id='state' value={state} onChange={(e)=>{setState(e.target.value);
                                                                      setCity('')}} >
                     <option value=''>Select your State</option>
        {State && State.getStatesOfCountry(country).map(state=>
          (<option value={state.isoCode} key={state.isoCode}>{state.name}</option>))} 
        </select>
      </div>}
      {state &&   <div className="shipping-form-group">
        <label htmlFor='city' >City</label>
        <select name='city' id='city' value={city} onChange={(e)=>{setCity(e.target.value)}} >
                     <option value=''>Select your City</option>
        {City && City.getCitiesOfState(country, state).map(city=>(<option value={city.name} key={city.name}>{city.name}</option>))} 
        </select>

      </div>}
      </div>
   <button className="shipping-submit-btn">Continue</button>
    </form>
    
</div>
 <Footer />
 
    </>
  )
}

export default Shipping
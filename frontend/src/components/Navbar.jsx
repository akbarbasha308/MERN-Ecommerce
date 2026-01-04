import React from 'react'
import '../componentStyles/Navbar.css'
import '../pageStyles/Search.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CloseIcon  from '@mui/icons-material/Close'
import MenuIcon  from '@mui/icons-material/Menu'
import { useSelector } from 'react-redux'


function Navbar() {
  const {isAuthenticated}=useSelector((state)=>state.user)
const[isMenuOpen,setIsMenuOpen] =useState(false)
const toggleMenu=()=>setIsMenuOpen(!isMenuOpen)
const [isSearchOpen,setIsSearchOpen]=useState(false)
const [searchQuery,setSearchQuery]=useState('')
const {cartItems} =useSelector(state=>state.cart)
const navigate=useNavigate()

const handleSearchSubmit=(e)=>{
  e.preventDefault()
if(searchQuery.trim())
{
  navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`)
}
else{
  navigate('/products')
}
setSearchQuery('')
}
const handleSearchClick=(e)=>
{
  e.preventDefault()
  if(!isSearchOpen)
  {
 setIsSearchOpen(!isSearchOpen)
  }
  else
  {
    handleSearchSubmit(e)
  }
}
  return (
    <nav className='navbar'>
        <div className="navbar-container">
  <div className="navbar-logo">
    <Link to='/' >ShopEasy</Link>
  </div>
  <div className={`navbar-links ${isMenuOpen ? 'active' : '' }`}>
    <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/products'>Product</Link></li>
        <li><Link to='/about-us'>About-us</Link></li>
        <li><Link to='/contact-us'>Contact-us</Link></li>
    </ul>
  </div>
  <div className="navbar-icons">
    <div className='search-container'>
        <form onSubmit={handleSearchSubmit} className={`search-form ${isSearchOpen?'active':''}`}>
           <input type='text' placeholder='search product..' className='search-input' 
           onChange={(e)=>setSearchQuery(e.target.value)} value={searchQuery} />
            <button className='search-icon'  type='button' onClick={handleSearchClick} >
                <SearchIcon focusable='false'  />
            </button>
        </form>
    </div>
    <div className="cart-container">
        <Link to='/cart' >
        <ShoppingCartIcon  className='icon' />
        <span className='cart-badge'>{cartItems.length}</span>
        </Link>
    </div>
    {!isAuthenticated && <Link to='/register' className='register-link'>
    <PersonAddIcon className='icon'/>
    </Link> }
    <div className="navbar-hamburger" onClick={toggleMenu}>
        {isMenuOpen?<CloseIcon className='icon' />:<MenuIcon className='icon' />}
    </div>
    
  </div>
        </div>
    </nav>
  )
}

export default Navbar
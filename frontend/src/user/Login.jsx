import React,{useEffect,useState} from 'react'
import '../UserStyles/Form.css'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {login,removeErrors,removeSuccess} from '../features/user/userSlice'
import {toast} from 'react-toastify'


function Login() {
    const dispatch =useDispatch()
    const navigate=useNavigate()
    const location=useLocation()
    const [loginEmail,setLoginEmail]=useState('')
    const[loginPassword,setLoginPassword]=useState('')
    
    const loginSubmit=(e)=>{
        e.preventDefault()
        dispatch(login({email:loginEmail,password:loginPassword}))
    }
    const{error,loading,isAuthenticated,success}=useSelector((state)=>state.user)
    const redirect = new URLSearchParams(location.search).get('redirect') || '/' 

    useEffect(()=>{
        if(error)
        {
            toast.error(error,{position:'top-center',autoClose:3000})
            dispatch(removeErrors())
        }
        
    },[dispatch,error])
    useEffect(()=>{
        if(success)
        {
            toast.success('successfully logged In',{position:'top-center',autoClose:3000})
            dispatch(removeSuccess())
        }
        
    },[dispatch,success])
    useEffect(()=>{
    if(isAuthenticated)  
        {
            navigate(redirect)
 } },[isAuthenticated])
  return (
    <div className='form-container container'>
        <div className="form-content">
            <form action="" className='form' onSubmit={loginSubmit}>
                 <h2>Log In</h2>
                <div className="input-group">
                    <input type='email' placeholder='email' autoComplete="off"
                    value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} />
                </div>
                <div className="input-group">
                    <input type='password' placeholder='password'  autoComplete="new-password"
                    value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} />
                </div>
                <button className="authBtn">SignIn</button>
                <p className="form-links">forgot your password<Link to='/reset/forgot'>reset here</Link></p>
                 <p className="form-links">Don't have an Account<Link to='/register'>Signup here</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Login
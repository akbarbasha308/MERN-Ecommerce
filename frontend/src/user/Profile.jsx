import React, { useEffect } from 'react'
import '../UserStyles/Profile.css'
import{Link,useNavigate} from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'

function Profile() {
    const{loading,user,isAuthenticated}=useSelector((state)=>state.user)
    const navigate =useNavigate()
    useEffect(()=>{
        if(!isAuthenticated)
        {
            navigate('/login')
        }
    },[isAuthenticated])
  return (
    <>
    {loading? (<Loader />):
    (<>
        <div className='profile-container'>
        <PageTitle title={`${user.name} profile`}/>
        <div className='profile-image'>
        <h1 className='profile-heading'>My profile</h1>
        <img src={user.avatar.url?user.avatar.url:'./image/profile.png'}
       alt='User profile' />
       <Link to="/profile/update">Edit Profile</Link>
        </div>
        <div className="profile-details">
            <div className="profile-detail">
                <h2>UserName:</h2>
                <p>{user.name}</p>
            </div>
            <div className="profile-detail">
                <h2>email:</h2>
                <p>{user.email}</p>
            </div>
            <div className="profile-buttons">
                <Link to='/orders/user'>MyOrders</Link>
                <Link to='/password/update'> change password</Link>
            </div>
        </div>
    </div>

    </>)}
    
  </>)
}

export default Profile
import React,{useEffect} from 'react'
import '../AdminStyles/UsersList.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import { Link,useNavigate } from 'react-router-dom'
import { Delete,Edit } from '@mui/icons-material'
import { useDispatch,useSelector } from 'react-redux'
import { fetchAllUsers,removeMessage,removeSuccess,removeErrors,deleteUser  } from '../features/admin/adminSlice'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'

function UsersList() {
const {users,loading,error,message}=useSelector(state=>state.admin)
const dispatch=useDispatch()
const navigate=useNavigate()
useEffect(()=>{
   dispatch(fetchAllUsers()) 
},[dispatch])

const handleDelete=(id)=>{
    const confirm =window.confirm('Are you sure want to delete user ?')

if(confirm)
{
dispatch(deleteUser(id))
}
}
useEffect(()=>{
    if(error)
    {
        toast.error(error,{position:'top-center',autoClose:3000})
     dispatch(removeErrors())
    }
},[dispatch,error])
useEffect(()=>{
    if(message)
    {
        toast.success(message,{position:'top-center',autoClose:3000})
     dispatch(removeMessage())
     navigate('/admin/dashboard')
    }
},[dispatch,message])

  return (
    <>{
        loading?(<Loader/ >):(
            <>
            <Navbar/>
            <PageTitle title='Users list' />
            <div className="usersList-container">
         <h1 className="usersList-title">All Users</h1>            
           <div className="usersList-table-container">
            <table className="usersList-table">
                <thead>
                    <tr>
                    <th>SlNo</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created At</th>
                    <th>Action</th>
                    </tr>
                    </thead>
                        <tbody>
             {users?.map((user,index)=>(
    <tr key={user._id}>
             <td>{index+1}</td>
             <td>{user.name}</td>
             <td>{user.email}</td>
             <td>{user.role}</td>
              <td>{user.createdAt}</td>
              <td>
                <Link to={`/admin/user/${user._id}`} className='action-icon edit-icon' ><Edit /></Link>
                <button className='action-icon delete-icon' onClick={()=>handleDelete(user._id)}><Delete/></button>
              </td>
             </tr>
)

)}
                        </tbody>
                     </table>
                    </div>  
            
            </div>
            <Footer />
            </>
        )
    }
    </>
  )
}

export default UsersList
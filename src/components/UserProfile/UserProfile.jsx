import React, { useContext, useEffect , useState } from 'react'
import './UserProfile.css'
import { loginContext } from '../../contexts/loginContext'
import { NavLink, Outlet } from 'react-router-dom'
import axios from 'axios'

function UserProfile() {
  const [currentUser]=useContext(loginContext)
  const activeLink={
    color:"#ffaa00",
    fontSize:"1.2rem",
    fontWeight:"bold",
  }
  const inActiveLink={
    color:"black",
    fontSize:"1.2rem",
  }
  const [message,setMessage]=useState('')
  let protectedSubmit=async()=>{
    let token=localStorage.getItem("token")
    await axios
      .get("http://localhost:5000/user-api/get-users",{
        headers:{
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
      .then((response)=>{
          setMessage(response.data.message)
      })
      .catch((err)=>{
        setMessage(err.message);
      })
  }
  useEffect(() => {
  }, [message])
  
  return (
    <div>
      <p className="display-3 text-end">Welcome ,{currentUser.username}</p>
      <p className="display-6 text-end">{currentUser.email}</p>
      <img src={currentUser.image} width="100px" alt="" className='float-end'/>
      {message.length!==0 && <p className='display-3 text-danger text-center'>{message}</p>}
      <button onClick={protectedSubmit} type='submit' className="btn mr-0 mt-3 btn-info">Get Message</button>
      <ul className="nav p-5 m-5">
        <li className="nav-item p-5 m-5">
          <NavLink className="nav-item" to="products" style={({isActive})=>{
            return isActive? activeLink:inActiveLink;
          }}>
            Products
          </NavLink>
          <NavLink className="nav-item p-5 m-5" to="cart" style={({isActive})=>{
            return isActive? activeLink:inActiveLink;
          }}>
            Cart
          </NavLink>
        </li>
      </ul>
      <Outlet/>
    </div>
  )
}

export default UserProfile
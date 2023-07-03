import React, { useState,useContext } from 'react'
import './Signin.css'
import {useForm} from 'react-hook-form'
import {FcGoogle} from 'react-icons/fc'
import {FaFacebookSquare , FaGithub} from 'react-icons/fa'
import {TiTick} from 'react-icons/ti'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { loginContext } from '../../contexts/loginContext'


function Signin() {
  let [currentUser,loginUser,userLoginStatus,loginErr]=useContext(loginContext)
  const navigate=useNavigate()
  let {register,handleSubmit,formState:{errors}}=useForm()
  let submitForm=async(userCredObj)=>{
    await loginUser(userCredObj)
    if(userLoginStatus){
      navigate('/')
    }
  }
  return (
    <div className='container p-4 d-flex flex-wrap justify-content-center text-white' id="page">
      <div className='text-center p-3 rounded d-block' id="second">
            <h1 className='d-block  pt-5 p-5'>Login</h1>
            <h4 className='d-block p-3'>Login to get notified<br/> for upcomming events</h4>
            <TiTick size={100}/>
        </div>
        <div  className='text-center p-3 rounded d-block' id="first">
          <h2>Login</h2>
          {loginErr.length!==0 && <p className='display-3 text-danger text-center'>{loginErr}</p>}
          <div className='pb-3'>
            <p>Login through</p>
            {/* <a href='/' className='pe-1'><FcGoogle size={40}/></a>
            <a href='/' className='pe-1'><FaFacebookSquare size={40}/></a>
            <a href='/' className='pe-1'><FaGithub size={40}/></a> */}
          </div>
            {/* <p>Or Login through Email</p> */}
          <div className='d-block '>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="p-3 mx-auto"> 
                <input type="text"  className='form-control mb-3' placeholder='Username' {...register("username",{required:{value:"true",message:"* Username is required"},minLength:{value:4,message:"* Username is Too Small"},maxLength:{value:8,message:"* Username is Too Big"}})}/>
                {errors.username?.message && <p className="text-danger">{errors.username?.message}</p> }            
              </div>
              <div className="p-3 mx-auto">
                <input type="password" className='form-control mb-3' placeholder='password' {...register("password",{required:{value:"true",message:"* Password is required"},minLength:{value:8,message:"* Password is Too Small"},maxLength:{value:16,message:"* Password is Too Big"}})}/>
                {errors.password?.message && <p className="text-danger">{errors.password?.message}</p> }       
              </div>
              <div className='pt-4'>
              <button type='submit' className="btn btn-warning mr-0 mb-3 btn-info ">Login</button>
              </div>
            </form>
          </div>
        </div>
        
            
    </div>

    
  )
}


export default Signin
import React, { useState } from 'react'
import './Signup.css'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
  let [error,setError]=useState('');
  let [selectedFile,setSelectedFile]=useState(null)
  let {register,handleSubmit,formState:{errors}}=useForm()
  const navigate=useNavigate()
  const onFileSelect=(e)=>{
    setSelectedFile(e.target.files[0]);
  }
  let submitForm=(newUser)=>{
    let fdObj=new FormData();
    fdObj.append("user",JSON.stringify(newUser));
    fdObj.append("photo",selectedFile);
    axios
      .post("http://localhost:5000/user-api/user-signup",fdObj)
      .then((response)=>{
        if(response.status===201){
          //navigate to login component
          navigate('/signin')
        }
        else{
          setError(response.data.message)
          console.log(error)
        }
      })
      .catch((err)=>{
        //the client was given an error response
        if(err.response){
          setError(err.message);
        }
        //the client never received a response
        else if(err.request){
          setError(err.message);
        }
        //for other error
        else{
          setError(err.message);
        }
      })
  }
  return (
    <div className='container'>
      <div className="reg container mt-5 ">
        <h2 className='text-center mx-auto'>Sign up</h2>
        {error.length!==0&&(
          <p className="display-3 text-danger text-center">{error.message}</p>
        )}
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="row row-cols-1 row-cols-md-2">
            <div className="col mx-auto">            
              <label htmlFor="firstname">Firstname</label>
              <input type="text" id="firstname" className='form-control mb-3' placeholder='FirstName' {...register("firstname",{required:{value:"true",message:"* FirstName is required"},minLength:{value:4,message:"* FirstName is Too Small"},maxLength:{value:8,message:"* FirstName is Too Big"}})}/>
              {errors.firstname?.message && <p className="text-danger">{errors.firstname?.message}</p> }            
            </div>
            <div className="col mx-auto">            
              <label htmlFor="lastname">Lastname</label>
              <input type="text" id="lastname" className='form-control mb-3'  placeholder='LastName' {...register("lastname",{required:{value:"true",message:"* LastName is required"},minLength:{value:4,message:"* LastName is Too Small"},maxLength:{value:8,message:"* LastName is Too Big"}})}/>
              {errors.lastname?.message &&<p className="text-danger">{errors.lastname?.message}</p>}              
            </div>
            <div className="col mx-auto">            
              <label htmlFor="username">UserName</label>
              <input type="text" id="username" className='form-control mb-3' placeholder='Username' {...register("username",{required:{value:"true",message:"* Username is required"},minLength:{value:4,message:"* Username is Too Small"},maxLength:{value:8,message:"* Username is Too Big"}})}/>
              {errors.username?.message && <p className="text-danger">{errors.username?.message}</p> }            
            </div>
            <div className="col mx-auto">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className='form-control mb-3' placeholder='password' {...register("password",{required:{value:"true",message:"* Password is required"},minLength:{value:8,message:"* Password is Too Small"},maxLength:{value:16,message:"* Password is Too Big"}})}/>
              {errors.password?.message && <p className="text-danger">{errors.password?.message}</p> }       
            </div>
            <div className="col mx-auto">            
              <label htmlFor="birthday">Date of Birthday</label>
              <input type="date" id="dateofbirth" className='form-control mb-3' placeholder='birthday'{...register("dateofbirth",{required:true,max:"2005-12-20"})}/>
              {errors.dateofbirth?.type==="required"&&<p className="text-danger">* DOB is required</p>}      
            </div>
            <div>            
              <label htmlFor="gender">Gender</label>
              <div className="row row-cols-1 row-cols-sm-2 ">
                <div className="form-check col">
                  <input type="radio" id="male" value="Male" {...register("gender",{required:{value:"true",message:"please select the gender"}})} />
                  <label htmlFor="male" className="form-check-label ">Male</label>
                </div>
                <div className="form-check col">
                  <input type="radio" id="female" value="Female" {...register("gender",{required:{value:"true",message:"please select the gender"}})} />
                  <label htmlFor="female" className="form-check-label ">Female</label>
                </div>
                {errors.gender?.message && <p className='text-danger'>{errors.gender?.message}</p>}
              </div> 
            </div>
            <div className="col mx-auto" >
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className='form-control' placeholder='emali id'  {...register("email",{required:{value:"true",message:"* email is required"}})}/>
              {errors.email?.message &&<p className="text-danger">{errors.email?.message}</p>}   
            </div>
            <div className="col mx-auto">
              <label htmlFor="number">Phone Number</label>
              <input type="number" id="phonenumber" className='form-control' placeholder="phone number" {...register("phonenumber",{required:{value:"true",message:"*Phone number is required"},minLength:{value:10,message:"*Phone number length should be 10"},maxLength:{value:10,message:"*Phone number length should be 10"}})} />
              {errors.phonenumber?.message && <p className='text-danger'>{errors.phonenumber?.message}</p> }
            </div>
            <div className="col mx-auto">
              <label htmlFor="image">Select Profile Pic</label>
              <input type="file" id="image" className='form-control' {...register("image",{required:{value:"true",message:"*Profile Pic is required"}})} onInput={onFileSelect}/>
              {errors.image?.message && <p className='text-danger'>{errors.image?.message}</p> }
            </div>
          </div> 
          <div className='text-center'>
            <button type='submit' className="btn mr-0 mt-3 btn-info ">Submit</button>
          </div>
        </form>
    </div>
  </div>
  )
}

export default Signup
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Auth from '../compontes/Auth'


const SignUp = () => {

    const [formData,setFormData]=useState({})

    const [error,setError]=useState(false)

    const [loading,setLoading]=useState(false)

    const navigate=useNavigate()

    const handleChanges=(e)=>{

      setFormData({...formData,[e.target.id]:e.target.value})
    }
    
    const handleSubmit = async (e) => {

        e.preventDefault();
    
        try {

            setLoading(true)

            const res = await axios.post('/auth/signup', formData);

            console.log(res.data); 

            setLoading(false)

            if(res.data.success=== false){

                setError(true)

                return
            }

            navigate('/')

        } catch (error) {

            setLoading(false)

            setError(true)
        }
    }
  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username'  id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChanges}/>
        <input type="email" placeholder='email'  id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChanges} />
        <input type="password" placeholder='password'  id='password' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChanges}/>
        <button  disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:placeholder-opacity-95 diasabled:opacity-80'>{loading?'Loading...':'SignUp'}</button>
        
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/signIn'>
        <span className='text-blue-500'>Sign In</span>
        </Link>
        
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong'}</p>
    </div>
  )
}

export default SignUp

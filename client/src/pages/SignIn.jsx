import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const SignIn = () => {

    const [formData, setFormData] = useState({})
    const { loading, error } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChanges = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(signInStart())

        try {

            const res = await axios.post('/auth/signin', formData)

            console.log(res.data)

            if (res.data.success === false) {

                dispatch(signInFailure(res.data.error))

                return
            }

            dispatch(signInSuccess(res.data))

            navigate('/')

        } catch (error) {

            dispatch(signInFailure(error.message))

        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type="email" placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChanges} />
                <input type="password" placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChanges} />
                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:placeholder-opacity-95 disabled:opacity-80'>
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Don't Have an account?</p>
                <Link to='/signup'>
                    <span className='text-blue-500'>Sign Up</span>
                </Link>
            </div>
            <p className='text-red-700 mt-5'>{error ? error.message || 'Something went wrong':""}</p>
        </div>
    )
}

export default SignIn

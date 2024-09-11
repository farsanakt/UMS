import axios from 'axios';
import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adminLoginSuccess } from '../../redux/admin/adminSlice';

const Login = () => {

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('') 

    const navigate=useNavigate()

    const dispatch=useDispatch()

    const handleSubmit = async (e) => {

        e.preventDefault()

        
        const formData = { email, password }
    
        console.log('Form data:', formData)
    
        try {

            const res = await axios.post('/api/admin/login', formData)

            console.log('Response data:', res.data)
    
            if (res.data.success) {

                dispatch(adminLoginSuccess({

                    token: res.data.token,
                    isloggedIn: true

                }))

                navigate('/admin/dashbord')

            } else if (res.data.message === 'invalid email') {

                setErrorMessage('Invalid email. Please try again.')

            } else if (res.data.message === 'invalid password') {

                setErrorMessage('Invalid password. Please try again.')

            } else {

                setErrorMessage('')

                console.log('Unexpected response:', res.data)

            }

        } catch (error) {

            setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.')

            console.error('Login failed:', error.response?.data?.message || error.message)
            
        }
    };
    

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>LogIn</h1>
            {errorMessage && (
                <p className="text-red-500 text-center mb-4">{errorMessage}</p>
            )}
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="bg-slate-100 p-3 rounded-lg"
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="bg-slate-100 p-3 rounded-lg"
                />
                <button
                    className="bg-green-500 text-white p-3 rounded-lg uppercase hover:placeholder-opacity-95 disabled:opacity-80"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Login;

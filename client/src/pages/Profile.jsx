import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)
  
  return (
    <div className='p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg'>
      <h1 className='text-4xl font-bold text-center mb-6'>Profile</h1>
      <div className='flex flex-col items-center'>
        <img 
          src={currentUser.profilePicture} 
          alt="Profile" 
          className='h-24 w-24 cursor-pointer rounded-full object-cover border-4 border-gray-300'
        />
        <h2 className='text-xl font-semibold mt-4'>{currentUser.username}</h2>
        <p className='text-gray-600'>{currentUser.email}</p>
      </div>
      <form className=''>
        <div className='mb-2'>
          <label htmlFor='username' className='block text-gray-700 font-medium mb-2'>Username</label>
          <input 
            defaultValue={currentUser.username} 
            type="text" 
            id='username' 
            className='w-full bg-slate-100 rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none'  
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700 font-medium mb-2'>Email</label>
          <input 
            defaultValue={currentUser.email} 
            type="text" 
            id='email' 
            className='w-full bg-slate-100 rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none'  
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='password' className='block text-gray-700 font-medium mb-2'>Password</label>
          <input 
            type="password" 
            id='password' 
            placeholder='Enter new password' 
            className='w-full bg-slate-100 rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none'  
          />
        </div>
        <button 
          type='submit' 
          className='w-full bg-blue-600 text-white rounded-lg p-3 font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
        >
          Update Profile
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}

export default Profile


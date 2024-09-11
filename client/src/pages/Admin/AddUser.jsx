import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const NewUser = () => {

  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleChange = async (e) => {  
    
    setFormData({ ...formData, [e.target.id]: e.target.value });

  }


  const validation = () => {
   
    const { username, email, password } = formData;
   
    if (!username && !email && !password || (username?.trim() == '' || email?.trim() == '' || password?.trim() == '')) {

      toast.error('field can not be empty')

      return false

    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {

      toast.error('Please enter a valid email address');

      return false;

    }
    
    if (username?.length < 4) {

      toast.error('username minimum 4 required')

      return false

    }

    if (password.length < 6) {

      toast.error('minimum 6 character Required')

      return false
    }

   
    return true
    
  };


  const handleAddUser = async (e) => {

    e.preventDefault();

    try {

        if (validation()) {

        
            const res = await axios.post("/api/admin/newuser", formData); 

            if (res.status === 200) {

                toast.success("Added new user...");

                navigate('/admin/dashbord');

            } else {

                toast.error('Something went wrong!');

            }
        }
    } catch (error) {

        toast.error(`Error: ${error.message}`);

        console.error(error);

    }
};


  return (

    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6 text-center">

          Add New User
        </h1>

        <form onSubmit={handleAddUser}>

          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-gray-600 dark:text-gray-300 mb-2"
            >
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="username"
              name="userName"
              placeholder="Enter user name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 dark:text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md shadow-md hover:bg-blue-700 transition-all ease-in duration-[.3]"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
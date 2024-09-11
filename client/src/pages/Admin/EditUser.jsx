import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const EditUser = () => {

  const [formData, setFormData] = useState({})

  const navigate = useNavigate()

  const { id } = useParams()

  
  useEffect(() => {

    const fetchUserData = async () => {

      try {

        const response = await axios.get(`/api/admin/getuser/${id}`)

        setFormData(response.data.user)

      } catch (error) {

        toast.error(`Error: ${error.message}`)

        console.error(error)
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.id]: e.target.value })

  }


  const validation = () => {

    const { username, email, password } = formData


    if (!username || !email || (password && password.trim() === '')) {

      toast.error('Fields cannot be empty')

      return false

    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {

      toast.error('Please enter a valid email address')

      return false

    }

    if (username.length < 4) {

      toast.error('Username must be at least 4 characters long')

      return false

    }

    if (password && password.length < 6) {

      toast.error('Password must be at least 6 characters long')

      return false

    }

    return true
  };

  const handleUpdateUser = async (e) => {

    e.preventDefault()

    try {

      if (validation()) {

        const updateData = {

          username: formData.username,

          password: formData.password || undefined 
        }

        const res = await axios.put(`/api/admin/edituser/${id}`, updateData);

        if (res.status === 200) {

          toast.success("User updated successfully")

          navigate('/admin/dashbord')

        } else {

          toast.error('Something went wrong!')

        }
      }
    } catch (error) {

      toast.error(`Error: ${error.message}`)

      console.error(error)
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6 text-center">
          Edit User
        </h1>

        <form onSubmit={handleUpdateUser}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 dark:text-gray-300 mb-2"
            >
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="username"
              placeholder="Enter user name"
              value={formData.username || ''}
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
              placeholder="Enter email address"
              value={formData.email || ''}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
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
              placeholder="Enter new password (leave blank if not changing)"
              value={formData.password || ''}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md shadow-md hover:bg-blue-700 transition-all ease-in duration-[.3]"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;

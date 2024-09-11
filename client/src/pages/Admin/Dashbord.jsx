import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from '../../redux/admin/adminSlice'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify' 

const Dashboard = () => {

  const [users, setUsers] = useState([])

  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const token = localStorage.getItem('adminToken')

  useEffect(() => {

    const fetchUserData = async () => {

      if (token) {

        try {

          const response = await axios.get('/api/admin/user', {

            headers: {
              Authorization: `Bearer ${token}`
            }

          })
      
          if (Array.isArray(response.data)) {

            setUsers(response.data);

          } else {

            console.error('Unexpected response format:', response.data)

          }

        } catch (error) {

          console.error('Error fetching user data:', error)

        }
      }
    };

    fetchUserData();
  }, [token]);

  const handleSearch = (e) => {

    setSearchTerm(e.target.value)

  }

  const filteredUsers = users.filter(user =>

    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||

    user.email.toLowerCase().includes(searchTerm.toLowerCase())

  )

  const handleDeleteUser = async (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",

    }).then(async (result) => {

      if (result.isConfirmed) {

        try {

          const response = await axios.delete(`/api/admin/deleteuser/${id}`);
        
          if (response.data.success) {

            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
           
            setUsers(users.filter(user => user._id !== id));
          }

        } catch (error) {

          console.error('Error deleting user:', error)

          Swal.fire({

            title: "Error!",
            text: "There was an error deleting the user.",
            icon: "error",

          })

        }
      }
    });
  };

  const handleSignOut = async () => {

    try {
   
      localStorage.removeItem('adminToken');

      dispatch(signOut());

      toast.success('Sign out successful!');

      navigate('/admin/login')


    } catch (error) {

      console.error('Error during sign-out:', error)

      toast.error('Sign out failed!')

    }
  };

  const handleEdit = (id) => {

    navigate(`/admin/edituser/${id}`)

  }

  return (

    <div className='p-5 max-w-4xl mx-auto'>
      <h1 className='text-3xl text-center font-semibold mb-5'>User Dashboard</h1>
      <div className='flex justify-between mb-5'>
        <input
          type="text"
          placeholder='Search users...'
          value={searchTerm}
          onChange={handleSearch}
          className='bg-slate-100 p-3 rounded-lg w-1/2'
        />
        <Link to={'/admin/newuser'}>
          <button className='bg-blue-500 text-white p-3 rounded-lg uppercase'>
            Add New User
          </button>
        </Link>
        <button onClick={handleSignOut} className='bg-red-500 text-white p-3 rounded-lg'>
          Sign Out
        </button>
      </div>

      {/* User List Table */}
      <table className='w-full bg-white rounded-lg overflow-hidden'>
        <thead>
          <tr className='bg-slate-200'>
            <th className='p-3 text-left'>Name</th>
            <th className='p-3 text-left'>Email</th>
            <th className='p-3 text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user._id} className='border-b'>
                <td className='p-3'>{user.username || 'N/A'}</td>
                <td className='p-3'>{user.email || 'N/A'}</td>
                <td className='p-3 flex justify-center gap-3'>
                  <button onClick={() => handleEdit(user._id)} className='bg-yellow-500 text-white p-2 rounded-lg'>Edit</button>
                  <button onClick={() => handleDeleteUser(user._id)} className='bg-red-500 text-white p-2 rounded-lg'>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className='p-3 text-center'>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

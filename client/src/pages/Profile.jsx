import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import axios from 'axios';
import { updateUserFailure, updateUserStart, updateUserSuccess ,deleteUserFailure,deleteUserStart,deleteUserSuccess,signout} from '../redux/user/userSlice';

const Profile = () => {

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const fileRef = useRef(null);

  const [image, setImage] = useState(undefined);

  const [imagePercent, setImagePercent] = useState(0);

  const [imageError, setImageError] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [updateStatus, setUpdateStatus] = useState(null); 

  const [formData, setFormData] = useState({

    username: currentUser.username,
    email: currentUser.email,
    profilePicture: currentUser.profilePicture,

  });

  useEffect(() => {

    if (image) {

      setImagePercent(0);
      setImageError(false);
      handleFileUpload(image);
      
    }
  }, [image]);

  const handleFileUpload = async (image) => {

    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        setUploadSuccess(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
          setUploadSuccess(true);
          setImageError(false);
        });
      }
    );
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      dispatch(updateUserStart());

      const res = await axios.post(`/api/update/${currentUser._id}`, formData);

      if (res.data.success === false) {

        setUpdateStatus('error')

        dispatch(updateUserFailure(res.data))

        return;
      }

      setUpdateStatus('success')

      dispatch(updateUserSuccess(res.data.data));

    } catch (error) {

      setUpdateStatus('error')

      dispatch(updateUserFailure(error))

    }
  };


  const handleDeleteAccount=async(req,res)=>{

        try {

          dispatch(deleteUserStart())

          const res = await axios.post(`/api/delete/${currentUser._id}`, formData);

          if(res.data.success === false){

            dispatch(deleteUserFailure(res.data))

            return

          }

           dispatch(deleteUserSuccess(res.data))

        } catch (error) {

          dispatch(deleteUserFailure(error))

        }
  }


  const handleSignOut=async()=>{

    try {

      await fetch('/api/auth/signout')

      dispatch(signout())

    } catch (error) {

      console.log(error)

    }
  }

  return (
    <div className='p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg'>
      <h1 className='text-4xl font-bold text-center mb-6'>Profile</h1>

      <form className='' onSubmit={handleSubmit}>
        <div className='flex flex-col items-center'>
          <input
            type='file'
            ref={fileRef}
            hidden
            accept='image/*'
            onChange={(e) => setImage(e.target.files[0])}
          />

          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt='Profile'
            className='h-24 w-24 cursor-pointer rounded-full object-cover border-4 border-gray-300'
            onClick={() => fileRef.current.click()}
          />
          <h2 className='text-xl font-semibold mt-4'>{currentUser.username}</h2>
          <p className='text-gray-600'>{currentUser.email}</p>
        </div>

        <div className='mb-2'>
          <label htmlFor='username' className='block text-gray-700 font-medium mb-2'>
            Username
          </label>
          <input
            value={formData.username}
            type='text'
            id='username'
            className='w-full bg-slate-100 rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none'
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700 font-medium mb-2'>
            Email
          </label>
          <input
            value={formData.email}
            type='text'
            id='email'
            className='w-full bg-slate-100 rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none'
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className='mb-6'>
          <label htmlFor='password' className='block text-gray-700 font-medium mb-2'>
            Password
          </label>
          <input
            type='password'
            value={formData.password}
            id='password'
            placeholder='Enter new password'
            className='w-full bg-slate-100 rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none'
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
        <span onClick={handleDeleteAccount} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>

      
      {imagePercent > 0 && imagePercent < 100 && (
        <p className='text-center mt-4'>Uploading: {imagePercent}%</p>
      )}
      {uploadSuccess && <p className='text-center mt-4 text-green-600'>Image uploaded successfully!</p>}
      {imageError && <p className='text-center mt-4 text-red-600'>Error uploading image</p>}

    
      {updateStatus === 'success' && <p className='text-center mt-4 text-green-600'>Profile updated successfully!</p>}
      {updateStatus === 'error' && <p className='text-center mt-4 text-red-600'>Error updating profile</p>}
    </div>
  );
};

export default Profile;

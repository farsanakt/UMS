import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

const Profile = () => {

  const { currentUser } = useSelector((state) => state.user);

  const fileRef = useRef(null);

  const [image, setImage] = useState(undefined);

  const [imagePercent, setImagePercent] = useState(0);

  const [imageError, setImageError] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);

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

  
  const handleSubmit = (e) => {

    e.preventDefault();

  };

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

      {/* Display the upload progress, success, or error message */}
      {imagePercent > 0 && imagePercent < 100 && (
        <p className='text-center mt-4'>Uploading: {imagePercent}%</p>
      )}
      {uploadSuccess && <p className='text-center mt-4 text-green-600'>Image uploaded successfully!</p>}
      {imageError && <p className='text-center mt-4 text-red-600'>Error uploading image</p>}
    </div>
  );
};

export default Profile;

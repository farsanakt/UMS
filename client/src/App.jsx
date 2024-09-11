import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
// import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Admin/Login';
import Dashbord from './pages/Admin/Dashbord';
import NewUser from './pages/Admin/AddUser';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import EditUser from './pages/Admin/EditUser';

const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={currentUser ? <Profile /> : <Navigate replace to='/signup' />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={currentUser ? <Navigate to='/signin' /> : <SignUp />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path='/admin/login' element={<Login />} />
          <Route path='/admin/dashbord' element={<Dashbord />} />
          <Route path='/admin/newuser' element={<NewUser />} />
          <Route path='/admin/edituser/:id' element={<EditUser />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

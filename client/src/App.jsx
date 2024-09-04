import React from 'react'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import Header from './compontes/Header'
import SignUp from './pages/SignUp'
import PrivateRoute from './compontes/PrivateRoute'
import { useSelector } from 'react-redux'

const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/profile' element={currentUser?<Profile/>:<Navigate replace={true} to={'/signup'}/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup'  element={currentUser?<Navigate to={'/signin'}/>:<SignUp/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App

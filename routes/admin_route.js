import express from 'express'
import { deleteUser, editUser, getUser, login, newUser, user } from '../controllers/adminController.js'
const router=express.Router()


router.post('/login',login)
router.get('/user',user)
router.post('/newuser',newUser)
router.delete('/deleteuser/:id',deleteUser)
router.get('/getuser/:id',getUser)
router.put('/edituser/:id',editUser)


export default router
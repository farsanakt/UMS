import express from 'express';
import {  updateUser,deleteUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.post('/update/:id', verifyToken, updateUser);
router.post('/delete/:id',verifyToken,deleteUser)

export default router;
